export function formatPrice(value, currency) {
  // USDC/USDT aren't ISO currency codes, so show them as plain numbers
  const iso = ["USD", "EUR", "GBP"].includes(currency);
  const options = { maximumFractionDigits: value < 1 ? 6 : 2 };
  return iso
    ? value.toLocaleString(undefined, { style: "currency", currency, ...options })
    : `${value.toLocaleString(undefined, options)} ${currency}`;
}

// With zero volume the "change" is just a stale price compared to itself
export function formatChange(ticker) {
  if (ticker.volume24h === 0) return "No trades";
  if (ticker.change24h === null) return "—";
  return `${ticker.change24h > 0 ? "+" : ""}${ticker.change24h.toFixed(2)}%`;
}

// CSS class for coloring the change: "up", "down", or "flat" (muted)
export function changeClass(ticker) {
  if (ticker.volume24h === 0 || !ticker.change24h) return "flat";
  return ticker.change24h > 0 ? "up" : "down";
}
