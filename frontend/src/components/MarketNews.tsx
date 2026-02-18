import { NEWS_ITEMS, NewsItem } from "../constants";

function TrendIcon({ trend }: { trend: NewsItem["trend"] }) {
    if (trend === "up") {
        return (
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
                <polyline points="17 6 23 6 23 12" />
            </svg>
        );
    }
    if (trend === "down") {
        return (
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <polyline points="23 18 13.5 8.5 8.5 13.5 1 6" />
                <polyline points="17 18 23 18 23 12" />
            </svg>
        );
    }
    // neutral
    return (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <line x1="5" y1="12" x2="19" y2="12" />
        </svg>
    );
}

export default function MarketNews() {
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
                    <path d="M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 1-2 2Zm0 0a2 2 0 0 1-2-2v-9c0-1.1.9-2 2-2h2" />
                    <path d="M18 14h-8" />
                    <path d="M15 18h-5" />
                    <path d="M10 6h8v4h-8V6Z" />
                </svg>
                <span className="card__title">Market News</span>
            </div>

            {NEWS_ITEMS.map((item) => (
                <div key={item.id} className="news-item" role="article">
                    <span className={`news-item__icon news-item__icon--${item.trend}`}>
                        <TrendIcon trend={item.trend} />
                    </span>
                    <div>
                        <div className="news-item__title">{item.title}</div>
                        <div className="news-item__meta">
                            <span className="news-item__source">{item.source}</span>
                            {" · "}
                            {item.time}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}
