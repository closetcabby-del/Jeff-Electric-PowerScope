# Jeff Electric PowerScope

A polished, mobile-first educational experience for Houston and Southeast Houston homeowners.

## What it includes

- Interactive Leaflet map with six supported ZIP codes and four educational data layers
- Electrical-era timeline
- Public-data visualizations sourced from EIA, USFA and ERCOT
- Illustrative Modern Power Readiness selector
- Safety-first, one-question-at-a-time symptom checker
- Accessible methodology dialog, keyboard controls and reduced-motion support

PowerScope never claims to inspect or diagnose a property. Its regional overlays and readiness points are explicitly educational.

## Run locally

No build step or API key is required.

```bash
python3 -m http.server 8080
```

Open `http://localhost:8080`.

## Deploy on GitHub Pages

The included workflow publishes the static site automatically on every push to `main`. In the repository:

1. Open **Settings → Pages**.
2. Under **Build and deployment**, choose **GitHub Actions** as the source.
3. Run the `Deploy static site to Pages` workflow if it does not start automatically.

The expected URL is `https://josh986.github.io/Jeff/`.

## Data

Exact displayed values and retrieval notes are in `data.js`. Sources:

- [U.S. Energy Information Administration](https://www.eia.gov/electricity/sales_revenue_price/)
- [U.S. Fire Administration](https://www.usfa.fema.gov/statistics/)
- [ERCOT yearly peak demand records](https://www.ercot.com/static-assets/data/news/content/a-peak-demand/all-time-records.htm)
- [U.S. Census American Community Survey](https://data.census.gov/)

Map tiles are provided by OpenStreetMap and rendered through Leaflet. If tiles are unavailable, the page retains a styled geographic fallback.
