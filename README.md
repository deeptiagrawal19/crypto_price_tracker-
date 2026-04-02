# BitPulse

BitPulse is a small dashboard for watching cryptocurrency prices. The web app pulls live market data, charts short term price history, and keeps a simple market summary in one dark themed layout.

## What you get

**Live prices and refresh.** Spot prices for Bitcoin, Ethereum, Dogecoin, Cardano, and Solana update on an interval and when you refocus the window. You can also trigger a manual refresh.

**Charts.** Each asset has a line chart of recent prices (five minute intervals from CoinCap). A bar chart at the bottom compares latest prices across the tracked set.

**Search.** Filter the card grid by name so you can focus on the coins you care about.

**Market summary.** A compact panel lists the latest USD price for every tracked coin.

Data comes from the public [CoinCap API](https://docs.coincap.io/) (`api.coincap.io`). No API key is required for the endpoints this project uses.

## Tech stack

The UI lives in `web-app/` and is built with **Next.js 15**, **React 19**, **TanStack React Query** for fetching and caching, **Axios** for HTTP, and **Recharts** for the charts. Styling is inline in the main page with a Tailwind oriented toolchain available for the rest of the app.

Documentation for the project (Docusaurus) lives in `docs/` if you want a separate doc site.

## Run the app locally

1. Install a current **Node.js** (18 or newer is a safe minimum).
2. Open a terminal and go to the `web-app` folder inside this repository.
3. Install dependencies:

   ```bash
   npm install
   ```

4. Start the dev server:

   ```bash
   npm run dev
   ```

5. Open the URL Next prints (usually `http://localhost:3000`).

**Production build:** from `web-app`, run `npm run build` then `npm start`.
