import { useState } from "react";
import "./PriceForm.css";

function PriceForm({ coins, currencies, loading, onSubmit }) {
  const [coin, setCoin] = useState("BTC");
  const [currency, setCurrency] = useState(currencies[0]);

  function handleSubmit(e) {
    e.preventDefault();
    onSubmit(coin.trim(), currency);
  }

  return (
    <form className="price-form" onSubmit={handleSubmit}>
      <label className="price-form-field">
        <span>Coin</span>
        <input
          type="text"
          list="coin-options"
          value={coin}
          onChange={(e) => setCoin(e.target.value.toUpperCase())}
          placeholder="e.g. BTC"
          required
        />
        <datalist id="coin-options">
          {coins.map((c) => (
            <option key={c} value={c} />
          ))}
        </datalist>
      </label>

      <label className="price-form-field">
        <span>Currency</span>
        <select value={currency} onChange={(e) => setCurrency(e.target.value)}>
          {currencies.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </label>

      <button type="submit" disabled={loading}>
        {loading ? "Checking..." : "Get price"}
      </button>
    </form>
  );
}

export default PriceForm;
