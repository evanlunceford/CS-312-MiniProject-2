import { changeClass, formatChange, formatPrice } from "../utils.js";
import "./MarketTable.css";

function MarketTable({ tickers, onSelect }) {
  if (tickers.length === 0) {
    return <p className="market-table-empty">No active pairs in this category.</p>;
  }

  return (
    <table className="market-table">
      <thead>
        <tr>
          <th>Pair</th>
          <th>Price</th>
          <th>24h</th>
        </tr>
      </thead>
      <tbody>
        {tickers.map((t) => (
          <tr key={t.symbol} onClick={() => onSelect(t)}>
            <td>{t.symbol}</td>
            <td>{formatPrice(t.price, t.quote)}</td>
            <td className={changeClass(t)}>{formatChange(t)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default MarketTable;
