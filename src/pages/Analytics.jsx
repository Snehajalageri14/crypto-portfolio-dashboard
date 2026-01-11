import { useEffect, useState } from "react";

function Analytics() {
  const [coin, setCoin] = useState("bitcoin");
  const [range, setRange] = useState(7);
  const [prices, setPrices] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hover, setHover] = useState(null);

  const WIDTH = 900;
  const HEIGHT = 260;
  const PADDING = 40;

  useEffect(() => {
    setLoading(true);
    fetch(
      `https://api.coingecko.com/api/v3/coins/${coin}/market_chart?vs_currency=inr&days=${range}`
    )
      .then((res) => res.json())
      .then((data) => setPrices(data.prices || []))
      .finally(() => setLoading(false));
  }, [coin, range]);

  if (!prices.length && loading) {
    return <p className="text-white/70">Loading chart…</p>;
  }

  const values = prices.map((p) => p[1]);
  const max = Math.max(...values);
  const min = Math.min(...values);

  const scaleX = (i) =>
    PADDING + (i / (prices.length - 1)) * (WIDTH - PADDING * 2);

  const scaleY = (v) =>
    HEIGHT -
    PADDING -
    ((v - min) / (max - min || 1)) * (HEIGHT - PADDING * 2);

  const path = prices
    .map((p, i) => {
      const x = scaleX(i);
      const y = scaleY(p[1]);
      return `${i === 0 ? "M" : "L"} ${x} ${y}`;
    })
    .join(" ");

  return (
    <div>
      <h2 className="text-3xl font-bold mb-6">Analytics</h2>

      {/* CONTROLS */}
      <div className="bg-white/10 backdrop-blur-md p-5 rounded-xl mb-6 flex gap-4 flex-wrap">
        <select
          value={coin}
          onChange={(e) => setCoin(e.target.value)}
          className="bg-black text-white p-3 rounded-lg"
        >
          <option value="bitcoin">Bitcoin</option>
          <option value="ethereum">Ethereum</option>
          <option value="binancecoin">BNB</option>
          <option value="cardano">Cardano</option>
          <option value="solana">Solana</option>
        </select>

        {[1, 7, 30].map((d) => (
          <button
            key={d}
            onClick={() => setRange(d)}
            className={`px-4 py-2 rounded-lg font-semibold ${
              range === d
                ? "bg-blue-600 text-white"
                : "bg-black/40 text-white/70"
            }`}
          >
            {d === 1 ? "1D" : d === 7 ? "7D" : "30D"}
          </button>
        ))}
      </div>

      {/* CHART */}
      <div className="bg-white/10 backdrop-blur-md p-6 rounded-xl relative">
        <h3 className="text-xl font-semibold mb-4">
          Price Chart (₹ INR)
        </h3>

        <svg
          viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
          width="100%"
          height="260"
          onMouseLeave={() => setHover(null)}
        >
          <defs>
            <linearGradient id="priceGradient" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#60a5fa" />
              <stop offset="100%" stopColor="#2563eb" />
            </linearGradient>
          </defs>

          <path
            d={path}
            fill="none"
            stroke="url(#priceGradient)"
            strokeWidth="3"
          />

          {/* Hover detection */}
          <rect
            x={PADDING}
            y={PADDING}
            width={WIDTH - PADDING * 2}
            height={HEIGHT - PADDING * 2}
            fill="transparent"
            onMouseMove={(e) => {
              const rect = e.target.getBoundingClientRect();
              const x = e.clientX - rect.left - PADDING;
              const index = Math.round(
                (x / (WIDTH - PADDING * 2)) * (prices.length - 1)
              );
              if (prices[index]) setHover(prices[index]);
            }}
          />

          {/* Hover line */}
          {hover && (
            <line
              x1={scaleX(prices.indexOf(hover))}
              x2={scaleX(prices.indexOf(hover))}
              y1={PADDING}
              y2={HEIGHT - PADDING}
              stroke="white"
              strokeDasharray="4"
              opacity="0.6"
            />
          )}

          {/* Hover dot */}
          {hover && (
            <circle
              cx={scaleX(prices.indexOf(hover))}
              cy={scaleY(hover[1])}
              r="5"
              fill="#facc15"
            />
          )}
        </svg>

        {/* TOOLTIP */}
        {hover && (
          <div className="absolute top-6 right-6 bg-black text-white px-4 py-2 rounded-lg shadow-lg text-sm">
            <p className="font-semibold">
              ₹ {hover[1].toLocaleString()}
            </p>
            <p className="text-white/70">
              {new Date(hover[0]).toLocaleString()}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Analytics;
