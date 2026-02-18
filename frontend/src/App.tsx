import { useCallback, useEffect, useState } from "react";
import { connectToPriceStream } from "./websocket";
import { PriceUpdate, StockData, ChartPoint } from "./types";
import { DEFAULT_SYMBOL } from "./constants";
import Navbar from "./components/Navbar";
import MarketOverview from "./components/MarketOverview";
import Watchlist from "./components/Watchlist";
import PriceChart from "./components/PriceChart";
import StockDetails from "./components/StockDetails";
import MarketNews from "./components/MarketNews";
import "./App.css";

// Maximum historical data points kept per symbol for charting.
const MAX_HISTORY = 100;

function App() {
    const [stocks, setStocks] = useState<Record<string, StockData>>({});
    const [selectedSymbol, setSelectedSymbol] = useState<string>(DEFAULT_SYMBOL);
    const [connected, setConnected] = useState(false);

    const handlePriceUpdate = useCallback((update: PriceUpdate) => {
        setConnected(true);

        setStocks((prev) => {
            const existing = prev[update.symbol];

            // First tick for this symbol becomes the session "open" price.
            const open      = existing?.open ?? update.price;
            const high      = existing ? Math.max(existing.high, update.price) : update.price;
            const low       = existing ? Math.min(existing.low,  update.price) : update.price;
            const change    = update.price - open;
            const changePct = open !== 0 ? (change / open) * 100 : 0;

            const point: ChartPoint = {
                price: update.price,
                timestamp: update.timestamp,
                time: new Date(update.timestamp * 1000).toLocaleString("en-US", {
                    month: "numeric",
                    day: "numeric",
                    year: "numeric",
                    hour: "numeric",
                    minute: "2-digit",
                    hour12: true,
                } as Intl.DateTimeFormatOptions),
            };

            const history = existing
                ? [...existing.history.slice(-(MAX_HISTORY - 1)), point]
                : [point];

            return {
                ...prev,
                [update.symbol]: { symbol: update.symbol, price: update.price, open, high, low, change, changePct, history },
            };
        });
    }, []);

    useEffect(() => {
        const socket = connectToPriceStream(handlePriceUpdate);
        socket.onclose = () => setConnected(false);
        return () => socket.close();
    }, [handlePriceUpdate]);

    return (
        <div className="app">
            <Navbar connected={connected} />

            <div className="content">
                <MarketOverview stocks={stocks} />

                <div className="dashboard-grid">
                    <Watchlist
                        stocks={stocks}
                        selectedSymbol={selectedSymbol}
                        onSelect={setSelectedSymbol}
                    />

                    <div className="right-panel">
                        <PriceChart stock={stocks[selectedSymbol]} symbol={selectedSymbol} />

                        <div className="bottom-row">
                            <StockDetails stock={stocks[selectedSymbol]} symbol={selectedSymbol} />
                            <MarketNews />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;
