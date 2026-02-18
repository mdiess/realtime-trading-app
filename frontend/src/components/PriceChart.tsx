import { useState } from "react";
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    TooltipProps,
} from "recharts";
import { StockData } from "../types";
import { STOCK_META, PERIODS, Period } from "../constants";

interface PriceChartProps {
    stock: StockData | undefined;
    symbol: string;
}

const fmtPrice = (v: number) =>
    v.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

function formatYAxis(value: number): string {
    if (value >= 1000) return `$${(value / 1000).toFixed(1)}K`;
    if (value >= 100)  return `$${value.toFixed(0)}`;
    return `$${value.toFixed(2)}`;
}

function CustomTooltip({ active, payload }: TooltipProps<number, string>) {
    if (!active || !payload?.length) return null;
    const point = payload[0];
    return (
        <div className="chart-tooltip">
            <div className="chart-tooltip__time">{point.payload.time}</div>
            <div className="chart-tooltip__price" style={{ color: point.stroke as string }}>
                ${fmtPrice(point.value ?? 0)}
            </div>
        </div>
    );
}

function ActivityIcon() {
    return (
        <svg
            className="chart-header__icon"
            width="17"
            height="17"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
        >
            <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
        </svg>
    );
}

export default function PriceChart({ stock, symbol }: PriceChartProps) {
    const [period, setPeriod] = useState<Period>("1D");

    const meta      = STOCK_META[symbol];
    const isUp      = !stock || stock.change >= 0;
    const lineColor = isUp ? "#22c55e" : "#ef4444";
    const gradId    = `grad-${symbol}`;
    const data      = stock?.history ?? [];

    // Show a tick for every ~5th data point to avoid label crowding.
    const tickInterval = data.length > 10 ? Math.floor(data.length / 5) - 1 : 0;

    return (
        <div className="chart-card">
            {/* Stock header */}
            <div className="chart-header">
                <ActivityIcon />
                <span className="chart-header__symbol">{symbol.replace("-USD", "")}</span>
                <span className="chart-header__name">{meta?.name}</span>
            </div>

            {/* Current price */}
            <div className="chart-price">
                {stock ? `$${fmtPrice(stock.price)}` : "—"}
            </div>

            {/* Price change */}
            {stock && (
                <div className={`chart-change ${isUp ? "up" : "down"}`}>
                    {isUp ? (
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                            <line x1="12" y1="19" x2="12" y2="5" /><polyline points="5 12 12 5 19 12" />
                        </svg>
                    ) : (
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                            <line x1="12" y1="5" x2="12" y2="19" /><polyline points="19 12 12 19 5 12" />
                        </svg>
                    )}
                    {isUp ? "+" : ""}
                    {fmtPrice(stock.change)}{" "}
                    ({isUp ? "+" : ""}{stock.changePct.toFixed(2)}%)
                </div>
            )}

            {/* Time period tabs */}
            <div className="period-tabs">
                {PERIODS.map((p) => (
                    <button
                        key={p}
                        className={`period-tab${period === p ? " period-tab--active" : ""}`}
                        onClick={() => setPeriod(p)}
                    >
                        {p}
                    </button>
                ))}
            </div>

            {/* Chart */}
            {data.length < 2 ? (
                <div className="chart-empty">Collecting price data…</div>
            ) : (
                <ResponsiveContainer width="100%" height={260}>
                    <AreaChart data={data} margin={{ top: 4, right: 8, left: 4, bottom: 0 }}>
                        <defs>
                            <linearGradient id={gradId} x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%"  stopColor={lineColor} stopOpacity={0.18} />
                                <stop offset="95%" stopColor={lineColor} stopOpacity={0} />
                            </linearGradient>
                        </defs>

                        <XAxis
                            dataKey="time"
                            interval={tickInterval}
                            tick={{ fill: "#4a4c62", fontSize: 10 }}
                            axisLine={false}
                            tickLine={false}
                        />

                        <YAxis
                            domain={["auto", "auto"]}
                            tickFormatter={formatYAxis}
                            tick={{ fill: "#4a4c62", fontSize: 10 }}
                            axisLine={false}
                            tickLine={false}
                            width={62}
                        />

                        <Tooltip content={<CustomTooltip />} />

                        <Area
                            type="monotone"
                            dataKey="price"
                            stroke={lineColor}
                            strokeWidth={1.5}
                            fill={`url(#${gradId})`}
                            dot={false}
                            activeDot={{ r: 4, fill: lineColor, strokeWidth: 0 }}
                            isAnimationActive={false}
                        />
                    </AreaChart>
                </ResponsiveContainer>
            )}
        </div>
    );
}
