import React, { useEffect, useState } from "react";
import { connectToPriceStream, PriceUpdate } from "./websocket";

// Keyed by symbol so each row updates in-place rather than appending.
type PriceMap = Record<string, PriceUpdate>;

function App() {
    const [prices, setPrices] = useState<PriceMap>({});
    const [connected, setConnected] = useState(false);

    useEffect(() => {
        const socket = connectToPriceStream((update: PriceUpdate) => {
            setConnected(true);
            setPrices((prev) => ({
                ...prev,
                [update.symbol]: update,
            }));
        });

        socket.onclose = () => setConnected(false);

        // Close the WebSocket cleanly when the component unmounts.
        return () => socket.close();
    }, []);

    const rows = Object.values(prices);

    return (
        <div style={styles.container}>
            <h1 style={styles.heading}>Live Crypto Prices</h1>

            <p style={{ ...styles.status, color: connected ? "#22c55e" : "#ef4444" }}>
                {connected ? "● Connected" : "○ Connecting…"}
            </p>

            {rows.length === 0 ? (
                <p style={styles.empty}>Waiting for price data…</p>
            ) : (
                <table style={styles.table}>
                    <thead>
                        <tr>
                            <th style={styles.th}>Symbol</th>
                            <th style={styles.th}>Price (USD)</th>
                            <th style={styles.th}>Last Updated</th>
                        </tr>
                    </thead>
                    <tbody>
                        {rows.map((update) => (
                            <tr key={update.symbol} style={styles.row}>
                                <td style={styles.td}>{update.symbol}</td>
                                <td style={{ ...styles.td, fontWeight: 600 }}>
                                    $
                                    {update.price.toLocaleString("en-US", {
                                        minimumFractionDigits: 2,
                                        maximumFractionDigits: 2,
                                    })}
                                </td>
                                <td style={{ ...styles.td, color: "#888" }}>
                                    {new Date(update.timestamp * 1000).toLocaleTimeString()}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}

const styles: Record<string, React.CSSProperties> = {
    container: {
        padding: "32px",
        fontFamily: "'Courier New', Courier, monospace",
        maxWidth: 640,
        margin: "0 auto",
    },
    heading: {
        fontSize: "1.6rem",
        marginBottom: 4,
    },
    status: {
        fontSize: "0.85rem",
        marginBottom: 24,
    },
    empty: {
        color: "#888",
    },
    table: {
        width: "100%",
        borderCollapse: "collapse",
    },
    th: {
        padding: "10px 14px",
        textAlign: "left",
        borderBottom: "2px solid #333",
        fontSize: "0.85rem",
        textTransform: "uppercase",
        letterSpacing: "0.05em",
    },
    td: {
        padding: "10px 14px",
        borderBottom: "1px solid #e5e7eb",
    },
    row: {
        transition: "background 0.2s",
    },
};

export default App;
