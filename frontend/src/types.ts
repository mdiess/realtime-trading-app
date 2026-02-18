export interface PriceUpdate {
    symbol: string;
    price: number;
    timestamp: number;
}

export interface ChartPoint {
    price: number;
    timestamp: number;
    time: string; // formatted for X-axis display
}

export interface StockData {
    symbol: string;
    price: number;
    open: number;
    high: number;
    low: number;
    change: number;    // absolute change from first received price (open)
    changePct: number; // percentage change from open
    history: ChartPoint[];
}
