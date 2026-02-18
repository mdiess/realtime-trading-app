import asyncio

from fastapi import FastAPI, WebSocket, WebSocketDisconnect
from fastapi.middleware.cors import CORSMiddleware

from .redis_client import create_async_client

app = FastAPI(title="Realtime Trading API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

PRICES_CHANNEL = "prices"


@app.get("/")
async def health_check():
    return {"status": "ok"}


@app.websocket("/ws/prices")
async def prices_websocket(websocket: WebSocket):
    """
    Each connecting client gets its own dedicated Redis pub/sub subscription.
    Two concurrent tasks run per connection:
      - redis_listener: reads from Redis and forwards to the WebSocket
      - ws_listener:    drains incoming frames so the browser stays connected
    When either task exits (disconnect, error), the other is cancelled and
    the Redis connection is cleaned up.
    """
    await websocket.accept()

    client = create_async_client()
    pubsub = client.pubsub()
    await pubsub.subscribe(PRICES_CHANNEL)

    async def redis_listener():
        """Forward every Redis message to the WebSocket client."""
        async for message in pubsub.listen():
            if message["type"] == "message":
                try:
                    await websocket.send_text(message["data"])
                except Exception:
                    # Client is gone; let the task exit cleanly.
                    break

    async def ws_listener():
        """
        Consume (and discard) any frames sent from the browser so that the
        TCP connection does not stall.  WebSocketDisconnect is the expected
        exit path.
        """
        try:
            while True:
                await websocket.receive_text()
        except WebSocketDisconnect:
            pass

    redis_task = asyncio.create_task(redis_listener())
    ws_task = asyncio.create_task(ws_listener())

    # Block until whichever side disconnects first.
    _, pending = await asyncio.wait(
        [redis_task, ws_task],
        return_when=asyncio.FIRST_COMPLETED,
    )

    for task in pending:
        task.cancel()

    await pubsub.unsubscribe(PRICES_CHANNEL)
    await client.aclose()
