# CS-312 Mini Project 2 — Crypto Price Checker

A web app that looks up live cryptocurrency prices using the public
[Blockchain.com Exchange API](https://api.blockchain.com/v3/) (no auth required).

- **Backend:** Node.js + Express, calling the API with Axios
- **Frontend:** React (built with Vite), one CSS file per component

## Features

- Form to look up a coin (e.g. BTC) in a currency (USD, EUR, GBP, USDC, USDT)
- Shows the last trade price, 24h change, price 24h ago, and 24h volume
- Friendly error message when a pair doesn't exist or the API fails
- Market table of all active pairs, filterable by quote currency (category feature)
- Click any row in the market table to look it up

## Running

```bash
npm install
npm run dev      # Express on :3000 + Vite dev server on :5173 (open http://localhost:5173)
```

Production:

```bash
npm run build    # builds the React app into dist/
npm start        # Express serves the API and the built app on http://localhost:3000
```

## Routes

| Method | Route                     | Description                                        |
| ------ | ------------------------- | -------------------------------------------------- |
| GET    | `/api/tickers?quote=USD`  | Active trading pairs, optionally filtered by quote |
| POST   | `/api/price`              | Body `{ coin, currency }` → price for that pair    |

## Structure

```
server/index.js          Express server + Axios calls to the Blockchain API
client/src/App.jsx       Top-level state and API calls
client/src/components/   Header, PriceForm, PriceResult, ErrorMessage,
                         CategoryFilter, MarketTable (each with its own .css)
```
