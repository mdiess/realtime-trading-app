Frontend Design Specification

Overview

This document defines the complete frontend design specification for the realtime trading dashboard. It covers layout, visual hierarchy, component structure, styling rules, dark theme color system, spacing, typography, responsiveness, and interaction behavior.

⸻

Design Principles

Core Principles
	•	Dark, professional trading dashboard aesthetic
	•	Clear visual hierarchy with high contrast text on dark backgrounds
	•	Consistent spacing and alignment throughout
	•	Predictable interaction patterns
	•	Real-time data updates without UI jank

Visual Tone
	•	Dark navy background with card-based layout
	•	Accent blue for interactive elements and icons
	•	Green/red for positive/negative price changes
	•	Minimal use of color — only where it communicates meaning

⸻

Layout Structure

Global Layout

Page structure:
	•	Fixed Top Navigation Bar
	•	Main Content Area (centered, max-width constrained)
	  •	Market Overview (full-width grid of stat cards)
	  •	Dashboard Grid (two-column: Watchlist left, Chart + Details right)

Layout constraints:
	•	Max content width: 1440px
	•	Content horizontal padding: 24px (16px on mobile)
	•	Section vertical spacing: 20px–24px
	•	Component gap: 16px

⸻

Top Navigation Bar

Container

Height: 56px
Position: fixed top
Width: 100%
Background: #0a0b12
Border bottom: 1px solid #252638
Z-index: 1000

Contents

Left side:
	•	Activity/pulse icon (accent blue) + "Stock Dashboard" bold text

Center:
	•	Search input (pill shape, dark background, search icon prefix)
	•	Placeholder: "Search stocks by symbol or name..."

Right side:
	•	"Live Market Data" label + green pulsing dot when connected

Behavior
	•	Always visible, no transparency
	•	Search input hidden on mobile (< 600px)

⸻

Main Content Area

Container

Max width: 1440px
Centered horizontally
Top padding: nav-height + 24px
Bottom padding: 48px

⸻

Market Overview Section

Layout

Full-width card with 4 equal columns.
On tablet (< 1100px): 2 columns.

Each card shows:
	•	Asset name label (small, secondary text)
	•	Current price (large, bold, tabular nums)
	•	Change row: up/down arrow icon + absolute change + percentage change

Colors:
	•	Positive change: #22c55e (green)
	•	Negative change: #ef4444 (red)

⸻

Dashboard Grid

Layout

Two-column grid:
	•	Left column: 290px fixed — Watchlist
	•	Right column: 1fr — Price Chart + (Stock Details | Market News)

On screens < 900px: single column, stacked vertically.

⸻

Watchlist Component

Card with header (trend-up icon + "Watchlist" title).

Each row:
	•	Left: ticker symbol (bold, 14px), full name (secondary, 12px), volume (muted, 11px)
	•	Right: price (bold, tabular nums), % change (colored), market cap (muted, 11px)

States:
	•	Default: transparent background
	•	Hover: #1c1d2f
	•	Selected: #1e3161 (blue-tinted)
	•	Keyboard accessible (Enter to select)

⸻

Price Chart Component

Layout (no card wrapper, uses chart-card class):
	1.	Stock header: activity icon + symbol (bold 20px) + full name
	2.	Current price: large (34px), bold, tabular nums
	3.	Price change: colored arrow + absolute + percentage
	4.	Period tabs: 1D | 1W | 1M | 1Y | 5Y | 10Y | ALL
	5.	Recharts AreaChart (260px height)

Chart details:
	•	Line color: green (#22c55e) if price up, red (#ef4444) if down
	•	Gradient fill under line with low opacity (same color)
	•	No dot markers on line; active dot on hover
	•	isAnimationActive=false for smooth live updates
	•	X-axis: timestamps, ~5 ticks, no axis line
	•	Y-axis: formatted prices (K suffix for >1000), 62px wide, no axis line
	•	Custom tooltip: dark card with time + price

Period tabs:
	•	Default active: 1D
	•	Active state: solid accent blue (#3b82f6) background
	•	Inactive: transparent with border
	•	Visual only (data always shows full available history)

⸻

Stock Details Component

Card with header (info-circle icon + "Stock Details" title).

2×3 grid of metric cells:
	•	Open, High, Low, Volume, Market Cap, Change
	•	Each cell: uppercase label (11px, secondary text) + value (16px, bold)
	•	Change value: colored green/red based on direction
	•	Cells separated by 1px border gaps on dark background

⸻

Market News Component

Card with header (document icon + "Market News" title).

Each news item:
	•	Trend icon (trending-up, trending-down, or neutral dash)
	•	Title (13px, bold)
	•	Source · time ago (11px, muted)

Trend icon colors:
	•	Up: green (#22c55e)
	•	Down: red (#ef4444)
	•	Neutral: muted (#4a4c62)

⸻

Typography

Font Family

system-ui, -apple-system, "Segoe UI", Roboto, sans-serif

Font Sizes
	•	Page/chart price: 34px
	•	Section title: 15px–20px
	•	Body / cell label: 13px–14px
	•	Small / muted: 11px–12px

Font Weights
	•	Bold (700): prices, symbols, titles
	•	Semibold (600): card headers, values
	•	Regular: body text

Numeric values use font-variant-numeric: tabular-nums for stable column widths.

⸻

Color System

Background Colors

Page background:       #0d0e17
Navbar background:     #0a0b12
Card background:       #141525
Card inner / elevated: #191a2d
Selected item:         #1e3161
Hover state:           #1c1d2f
Border:                #252638

Text Colors

Primary:   #f1f1f5
Secondary: #8b8fa8
Muted:     #4a4c62

Accent & Signal Colors

Accent blue:  #3b82f6  (buttons, icons, active states)
Green:        #22c55e  (positive change, live indicator)
Red:          #ef4444  (negative change)

⸻

Component Specifications

Cards

Background: #141525
Border: 1px solid #252638
Border radius: 8px
Box shadow: 0 1px 4px rgba(0,0,0,0.4)
Overflow: hidden

Card headers use 13px border-bottom and icon + title layout.

Buttons (period tabs)

Height: 30px
Padding: 0 12px
Border radius: 6px
Font size: 13px
Inactive: transparent bg, border #252638, text #8b8fa8
Active: bg #3b82f6, border #3b82f6, text white
Hover (inactive): bg #1c1d2f, text #f1f1f5

⸻

Spacing System

Consistent spacing scale:
4px, 8px, 12px, 16px, 20px, 24px, 32px, 48px

Common values:
	•	Cell/item padding: 11px–14px vertical, 16px horizontal
	•	Card header padding: 13px 16px
	•	Section gap: 16px–20px
	•	Content padding: 24px horizontal

⸻

Responsive Behavior

Breakpoints

Desktop:  1200px and above
Tablet:   900px–1199px
Mobile:   below 600px

Tablet (< 1100px)

Market overview switches to 2-column grid.

Tablet (< 900px)

Dashboard grid collapses to single column.
Bottom row (Stock Details + News) collapses to single column.

Mobile (< 600px)

Navbar search bar hidden.
Content padding reduced to 12px.
Chart price font reduced to 26px.

⸻

Interaction States

Hover
	•	Watchlist rows: background #1c1d2f
	•	News items: background #1c1d2f
	•	Period tabs: background #1c1d2f, text brightens

Active / Selected
	•	Watchlist selected row: background #1e3161
	•	Period tab active: background #3b82f6

Focus

Keyboard-navigable elements use a visible focus outline using accent color.

⸻

Animation and Motion

Duration: 150ms ease for all transitions.

Applies to:
	•	Hover backgrounds
	•	Status dot color/glow
	•	Search input border
	•	Period tab color transitions

Chart updates (recharts): isAnimationActive=false to prevent re-animation on every live tick.

⸻

Accessibility

	•	Watchlist items: role="button", tabIndex=0, aria-pressed, onKeyDown Enter support
	•	Status dot: aria-label="Connected" / "Connecting"
	•	Navbar search: aria-label="Search"
	•	All SVG icons use aria-hidden="true"
	•	Visible focus states on all interactive elements

⸻

Data Flow

WebSocket (ws://localhost:8000/ws/prices)
  → connectToPriceStream(callback)
  → App.tsx handlePriceUpdate
      → tracks open, high, low, change, changePct, history per symbol
      → stocks: Record<symbol, StockData>
  → MarketOverview  ← stocks
  → Watchlist       ← stocks + selectedSymbol + onSelect
  → PriceChart      ← stocks[selectedSymbol] + symbol
  → StockDetails    ← stocks[selectedSymbol] + symbol
  → MarketNews      ← static mock data (constants.ts)

⸻

Implementation Notes

	•	Single App.css stylesheet with CSS custom properties for all tokens
	•	BEM-style class naming (block__element--modifier)
	•	Recharts for the live AreaChart (package: recharts ^2.13.0)
	•	All SVG icons are inline (no icon library dependency)
	•	No absolute positioning
	•	CSS Grid for page layout; Flexbox for component internals
