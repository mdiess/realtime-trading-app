import { StockData } from "../types";
import { STOCK_META, WATCHLIST_SYMBOLS } from "../constants";

interface MarketOverviewProps {
    stocks: Record<string, StockData>;
}

const fmt = (v: number) =>
    v.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

function ArrowUp() {
    return (
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <line x1="12" y1="19" x2="12" y2="5" />
            <polyline points="5 12 12 5 19 12" />
        </svg>
    );
}

function ArrowDown() {
    return (
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <line x1="12" y1="5" x2="12" y2="19" />
            <polyline points="19 12 12 19 5 12" />
        </svg>
    );
}

export default function MarketOverview({ stocks }: MarketOverviewProps) {
    return (
        <section className="market-overview">
            <h2 className="market-overview__title">Market Overview</h2>

            <div className="overview-grid">
                {WATCHLIST_SYMBOLS.map((symbol) => {
                    const stock = stocks[symbol];
                    const meta  = STOCK_META[symbol];
                    const isUp  = !stock || stock.change >= 0;

                    return (
                        <div key={symbol} className="overview-card">
                            <div className="overview-card__label">
                                {meta.name}
                            </div>

                            <div className="overview-card__price">
                                {stock ? `$${fmt(stock.price)}` : "—"}
                            </div>

                            <div className={`overview-card__change ${isUp ? "up" : "down"}`}>
                                {stock ? (
                                    <>
                                        {isUp ? <ArrowUp /> : <ArrowDown />}
                                        {isUp ? "+" : ""}
                                        {fmt(stock.change)}{" "}
                                        ({isUp ? "+" : ""}{stock.changePct.toFixed(2)}%)
                                    </>
                                ) : (
                                    <span style={{ color: "var(--text-muted)" }}>—</span>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>
        </section>
    );
}
