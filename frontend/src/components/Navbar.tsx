interface NavbarProps {
    connected: boolean;
}

export default function Navbar({ connected }: NavbarProps) {
    return (
        <nav className="navbar">
            {/* Logo */}
            <div className="navbar__logo">
                <svg
                    className="navbar__logo-icon"
                    width="20"
                    height="20"
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
                Stock Dashboard
            </div>

            {/* Search */}
            <div className="navbar__search">
                <svg
                    className="navbar__search-icon"
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                >
                    <circle cx="11" cy="11" r="8" />
                    <line x1="21" y1="21" x2="16.65" y2="16.65" />
                </svg>
                <input type="text" placeholder="Search stocks by symbol or name..." aria-label="Search" />
            </div>

            {/* Live status */}
            <div className="navbar__status">
                Live Market Data
                <span
                    className={`status-dot${connected ? " status-dot--live" : ""}`}
                    aria-label={connected ? "Connected" : "Connecting"}
                />
            </div>
        </nav>
    );
}
