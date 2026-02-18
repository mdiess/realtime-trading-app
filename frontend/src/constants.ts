export interface StockMeta {
    name: string;
    volume: string;
    marketCap: string;
}

export const STOCK_META: Record<string, StockMeta> = {
    "BTC-USD": { name: "Bitcoin",  volume: "28.4B", marketCap: "1.02T"  },
    "ETH-USD": { name: "Ethereum", volume: "12.1B", marketCap: "336.2B" },
    "SOL-USD": { name: "Solana",   volume: "4.8B",  marketCap: "45.7B"  },
    "BNB-USD": { name: "BNB",      volume: "2.3B",  marketCap: "59.1B"  },
};

export const DEFAULT_SYMBOL = "BTC-USD";

export const WATCHLIST_SYMBOLS = ["BTC-USD", "ETH-USD", "SOL-USD", "BNB-USD"] as const;

export const PERIODS = ["1D", "1W", "1M", "1Y", "5Y", "10Y", "ALL"] as const;
export type Period = (typeof PERIODS)[number];

export interface NewsItem {
    id: number;
    title: string;
    source: string;
    time: string;
    trend: "up" | "down" | "neutral";
}

export const NEWS_ITEMS: NewsItem[] = [
    {
        id: 1,
        title: "Bitcoin Surges Past Key Resistance Level",
        source: "CoinDesk",
        time: "1 hour ago",
        trend: "up",
    },
    {
        id: 2,
        title: "Federal Reserve Signals Potential Rate Adjustment",
        source: "Bloomberg",
        time: "3 hours ago",
        trend: "neutral",
    },
    {
        id: 3,
        title: "Ethereum Network Upgrade Scheduled for Next Month",
        source: "The Block",
        time: "4 hours ago",
        trend: "up",
    },
    {
        id: 4,
        title: "Crypto Market Volatility Expected to Continue This Week",
        source: "CNBC",
        time: "6 hours ago",
        trend: "down",
    },
    {
        id: 5,
        title: "Solana DeFi Activity Reaches New All-Time High",
        source: "CoinTelegraph",
        time: "7 hours ago",
        trend: "up",
    },
    {
        id: 6,
        title: "Institutional Crypto Adoption Accelerates in Q1",
        source: "Wall Street Journal",
        time: "9 hours ago",
        trend: "up",
    },
];
