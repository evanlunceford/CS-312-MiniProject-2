import { changeClass, formatChange, formatPrice } from "../utils.js";
import "./PriceResult.css";

function PriceResult({ ticker }) {
  return (
    <div className="price-result">
      <div className="price-result-symbol">{ticker.symbol}</div>
      <div className="price-result-price">{formatPrice(ticker.price, ticker.quote)}</div>
      <dl className="price-result-stats">
        <div>
          <dt>24h change</dt>
          <dd className={changeClass(ticker)}>{formatChange(ticker)}</dd>
        </div>
        <div>
          <dt>Price 24h ago</dt>
          <dd>{formatPrice(ticker.price24h, ticker.quote)}</dd>
        </div>
        <div>
          <dt>24h volume</dt>
          <dd>
            {ticker.volume24h.toLocaleString()} {ticker.base}
          </dd>
        </div>
      </dl>
    </div>
  );
}

export default PriceResult;
