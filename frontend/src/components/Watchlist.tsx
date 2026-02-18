import { StockData } from "../types";
import { STOCK_META, WATCHLIST_SYMBOLS } from "../constants";

interface WatchlistProps {
    stocks: Record<string, StockData>;
    selectedSymbol: string;
    onSelect: (symbol: string) => void;
}

const fmt = (v: number) =>
    v.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

export default function Watchlist({ stocks, selectedSymbol, onSelect }: WatchlistProps) {
    return (
        <div className="card">
            {/* Header */}
            <div className="card__header">
                <svg
                    className="card__header-icon"
                    width="15"
                    height="15"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                >
                    <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
                    <polyline points="17 6 23 6 23 12" />
                </svg>
                <span className="card__title">Watchlist</span>
            </div>

            {/* Items */}
            {WATCHLIST_SYMBOLS.map((symbol) => {
                const stock    = stocks[symbol];
                const meta     = STOCK_META[symbol];
                const isUp     = !stock || stock.change >= 0;
                const selected = symbol === selectedSymbol;

                return (
                    <div
                        key={symbol}
                        className={`watchlist-item${selected ? " watchlist-item--selected" : ""}`}
                        onClick={() => onSelect(symbol)}
                        role="button"
                        tabIndex={0}
                        onKeyDown={(e) => e.key === "Enter" && onSelect(symbol)}
                        aria-pressed={selected}
                    >
                        <div className="watchlist-item__left">
                            <div className="watchlist-item__symbol">
                                {symbol.replace("-USD", "")}
                            </div>
                            <div className="watchlist-item__name">{meta.name}</div>
                            <div className="watchlist-item__volume">Vol: {meta.volume}</div>
                        </div>

                        <div className="watchlist-item__right">
                            <div className="watchlist-item__price">
                                {stock ? `$${fmt(stock.price)}` : "—"}
                            </div>
                            {stock && (
                                <div className={`watchlist-item__change ${isUp ? "up" : "down"}`}>
                                    {isUp ? "+" : ""}
                                    {stock.changePct.toFixed(2)}%
                                </div>
                            )}
                            <div className="watchlist-item__mcap">${meta.marketCap}</div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}
