import express from "express";
import axios from "axios";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
const PORT = process.env.PORT || 3000;
const API_BASE = "https://api.blockchain.com/v3/exchange";
const __dirname = path.dirname(fileURLToPath(import.meta.url));

app.use(express.json());

//Adds the 24h percent change, since the API only gives the price from 24h ago
function formatTicker(t) {
  const [base, quote] = t.symbol.split("-");
  const change =
    t.price_24h > 0 ? ((t.last_trade_price - t.price_24h) / t.price_24h) * 100 : null;
  return {
    symbol: t.symbol,
    base,
    quote,
    price: t.last_trade_price,
    price24h: t.price_24h,
    volume24h: t.volume_24h,
    change24h: change,
  };
}

// All actively traded pairs, filters by category as well
app.get("/api/tickers", async (req, res) => {
  try {
    const response = await axios.get(`${API_BASE}/tickers`);
    const quote = req.query.quote?.toUpperCase();

    const tickers = response.data
      .filter((t) => t.last_trade_price > 0)
      .map(formatTicker)
      .filter((t) => !quote || quote === "ALL" || t.quote === quote)
      .sort((a, b) => a.symbol.localeCompare(b.symbol));

    res.json(tickers);
  } catch (err) {
    console.error("Failed to fetch tickers:", err.message);
    res.status(502).json({ error: "Could not load market data. Please try again later." });
  }
});

// Price lookup for one coin in one currency, submitted from the form
app.post("/api/price", async (req, res) => {
  const coin = String(req.body.coin || "").trim().toUpperCase();
  const currency = String(req.body.currency || "").trim().toUpperCase();

  if (!/^[A-Z0-9]{2,10}$/.test(coin) || !/^[A-Z]{3,5}$/.test(currency)) {
    return res.status(400).json({ error: "Please enter a valid coin symbol (e.g. BTC) and currency." });
  }

  const symbol = `${coin}-${currency}`;
  try {
    const response = await axios.get(`${API_BASE}/tickers/${symbol}`);
    if (!response.data.last_trade_price) {
      return res.status(404).json({ error: `${symbol} isn't actively trading right now. Try another pair.` });
    }
    res.json(formatTicker(response.data));
  } catch (err) {
    // The API responds with a 404/500 for pairs it doesn't list
    console.error(`Failed to fetch ${symbol}:`, err.message);
    res.status(404).json({ error: `Couldn't find a price for ${symbol}. Check the symbol and try again.` });
  }
});

// In production, serve the built React app
const distPath = path.join(__dirname, "..", "dist");
app.use(express.static(distPath));
app.use((req, res) => res.sendFile(path.join(distPath, "index.html")));

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
