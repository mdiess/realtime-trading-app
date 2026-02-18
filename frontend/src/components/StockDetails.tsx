import { StockData } from "../types";
import { STOCK_META } from "../constants";

interface StockDetailsProps {
    stock: StockData | undefined;
    symbol: string;
}

const fmtPrice = (v: number) =>
    `$${v.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

export default function StockDetails({ stock, symbol }: StockDetailsProps) {
    const meta = STOCK_META[symbol];

    const isUp = stock ? stock.change >= 0 : undefined;

    const cells = [
        { label: "Open",       value: stock ? fmtPrice(stock.open) : "—" },
        { label: "High",       value: stock ? fmtPrice(stock.high) : "—" },
        { label: "Low",        value: stock ? fmtPrice(stock.low)  : "—" },
        { label: "Volume",     value: meta ? meta.volume : "—" },
        { label: "Market Cap", value: meta ? `$${meta.marketCap}` : "—" },
        {
            label: "Change",
            value: stock
                ? `${isUp ? "+" : ""}${stock.change.toLocaleString("en-US", {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                  })}`
                : "—",
            color: isUp === undefined ? undefined : isUp ? "var(--green)" : "var(--red)",
        },
    ];

    return (
        <div className="card">
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
                    <circle cx="12" cy="12" r="10" />
                    <line x1="12" y1="8" x2="12" y2="12" />
                    <line x1="12" y1="16" x2="12.01" y2="16" />
                </svg>
                <span className="card__title">Stock Details</span>
            </div>

            <div className="details-grid">
                {cells.map((cell) => (
                    <div key={cell.label} className="details-cell">
                        <div className="details-cell__label">{cell.label}</div>
                        <div
                            className="details-cell__value"
                            style={cell.color ? { color: cell.color } : undefined}
                        >
                            {cell.value}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
