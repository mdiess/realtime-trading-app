"""
price_publisher.py

Simulates live cryptocurrency price updates and publishes them to the
Redis "prices" channel every second. Run this as a standalone script:

    python -m backend.app.price_publisher
"""

import json
import random
import time

from .redis_client import redis_client

CHANNEL = "prices"

# Seed prices for each simulated instrument
BASE_PRICES: dict[str, float] = {
    "BTC-USD": 52_000.00,
    "ETH-USD":  2_800.00,
    "SOL-USD":    105.00,
    "BNB-USD":    385.00,
}


def _next_price(current: float) -> float:
    """
    Apply a small Gaussian random walk to simulate realistic tick movement.
    Standard deviation is 0.1 % of the current price per tick.
    """
    pct_change = random.gauss(mu=0.0, sigma=0.001)
    return round(current * (1 + pct_change), 2)


def run() -> None:
    prices = BASE_PRICES.copy()
    print(f"[publisher] Starting — publishing to Redis channel '{CHANNEL}' every 1 s")

    while True:
        for symbol in prices:
            prices[symbol] = _next_price(prices[symbol])

            payload = json.dumps(
                {
                    "symbol": symbol,
                    "price": prices[symbol],
                    "timestamp": time.time(),
                }
            )

            redis_client.publish(CHANNEL, payload)
            print(f"[publisher] {payload}")

        time.sleep(1)


if __name__ == "__main__":
    run()
