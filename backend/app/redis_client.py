import redis
import redis.asyncio as aioredis

REDIS_HOST = "localhost"
REDIS_PORT = 6379

# Synchronous client — used by the price publisher
redis_client = redis.Redis(
    host=REDIS_HOST,
    port=REDIS_PORT,
    decode_responses=True,
)


def create_async_client() -> aioredis.Redis:
    """
    Create a new async Redis client per caller.
    The caller is responsible for calling .aclose() when finished.
    """
    return aioredis.Redis(
        host=REDIS_HOST,
        port=REDIS_PORT,
        decode_responses=True,
    )
