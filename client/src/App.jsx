import { useEffect, useState } from "react";
import axios from "axios";
import Header from "./components/Header.jsx";
import PriceForm from "./components/PriceForm.jsx";
import PriceResult from "./components/PriceResult.jsx";
import ErrorMessage from "./components/ErrorMessage.jsx";
import CategoryFilter from "./components/CategoryFilter.jsx";
import MarketTable from "./components/MarketTable.jsx";
import "./App.css";

const CURRENCIES = ["USD", "EUR", "GBP", "USDC", "USDT"];

function App() {
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const [category, setCategory] = useState("ALL");
  const [tickers, setTickers] = useState([]);
  const [marketError, setMarketError] = useState("");
  const [coins, setCoins] = useState([]);

  // Load the market list whenever the category filter changes
  useEffect(() => {
    setMarketError("");
    axios
      .get("/api/tickers", { params: { quote: category } })
      .then((res) => {
        setTickers(res.data);
        if (category === "ALL") {
          setCoins([...new Set(res.data.map((t) => t.base))].sort());
        }
      })
      .catch((err) => setMarketError(err.response?.data?.error || "Could not load market data."));
  }, [category]);

  async function lookupPrice(coin, currency) {
    setLoading(true);
    setError("");
    setResult(null);
    try {
      const res = await axios.post("/api/price", { coin, currency });
      setResult(res.data);
    } catch (err) {
      setError(err.response?.data?.error || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="app">
      <Header />
      <main className="app-main">
        <section className="app-section">
          <h2>Check a price</h2>
          <PriceForm coins={coins} currencies={CURRENCIES} loading={loading} onSubmit={lookupPrice} />
          {error && <ErrorMessage message={error} />}
          {result && <PriceResult ticker={result} />}
        </section>

        <section className="app-section">
          <h2>Market</h2>
          <CategoryFilter
            options={["ALL", ...CURRENCIES]}
            selected={category}
            onChange={setCategory}
          />
          {marketError ? (
            <ErrorMessage message={marketError} />
          ) : (
            <MarketTable tickers={tickers} onSelect={(t) => lookupPrice(t.base, t.quote)} />
          )}
        </section>
      </main>
    </div>
  );
}

export default App;
