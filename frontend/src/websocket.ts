const WS_URL = "ws://localhost:8000/ws/prices";

export interface PriceUpdate {
    symbol: string;
    price: number;
    timestamp: number;
}

/**
 * Opens a WebSocket connection to the price stream and calls `callback`
 * for every validated price update received from the server.
 *
 * Returns the underlying WebSocket so the caller can close it (e.g. on
 * component unmount).
 */
export function connectToPriceStream(
    callback: (update: PriceUpdate) => void
): WebSocket {
    const socket = new WebSocket(WS_URL);

    socket.onopen = () => {
        console.log("[WebSocket] Connected to price stream");
    };

    socket.onmessage = (event: MessageEvent) => {
        try {
            const update: PriceUpdate = JSON.parse(event.data as string);
            callback(update);
        } catch (err) {
            console.error("[WebSocket] Failed to parse message:", err);
        }
    };

    socket.onclose = (event: CloseEvent) => {
        console.log("[WebSocket] Connection closed —", event.code, event.reason);
    };

    socket.onerror = (error: Event) => {
        console.error("[WebSocket] Error:", error);
    };

    return socket;
}
