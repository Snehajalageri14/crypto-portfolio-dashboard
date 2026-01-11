import { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Tooltip,
} from "chart.js";

ChartJS.register(
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Tooltip
);

function DashboardHome() {
  const [summary, setSummary] = useState({
    invested: 0,
    current: 0,
    pnl: 0,
    percent: 0,
  });

  const [topPrices, setTopPrices] = useState({});
  const [chartData, setChartData] = useState(null);

  // 🔹 Fetch Top Coins Snapshot
  useEffect(() => {
    fetch(
      "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,binancecoin,cardano&vs_currencies=inr"
    )
      .then((res) => res.json())
      .then(setTopPrices);
  }, []);

  // 🔹 P&L Calculation (SAFE)
  useEffect(() => {
    const portfolio = JSON.parse(localStorage.getItem("portfolio")) || [];

    if (portfolio.length === 0) {
      setSummary({ invested: 0, current: 0, pnl: 0, percent: 0 });
      return;
    }

    const ids = portfolio.map((c) => c.id).join(",");

    fetch(
      `https://api.coingecko.com/api/v3/simple/price?ids=${ids}&vs_currencies=inr`
    )
      .then((res) => res.json())
      .then((prices) => {
        let invested = 0;
        let current = 0;

        portfolio.forEach((coin) => {
          const qty = Number(coin.quantity) || 0;
          const buy = Number(coin.buyPrice) || 0;
          const live = prices[coin.id]?.inr || 0;

          invested += qty * buy;
          current += qty * live;
        });

        const pnl = current - invested;
        const percent =
          invested > 0 ? ((pnl / invested) * 100).toFixed(2) : 0;

        setSummary({ invested, current, pnl, percent });
      });
  }, []);

  // 🔹 Mini Bitcoin Chart
  useEffect(() => {
    fetch(
      "https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=inr&days=7"
    )
      .then((res) => res.json())
      .then((data) => {
        setChartData({
          labels: data.prices.map((p) =>
            new Date(p[0]).toLocaleDateString()
          ),
          datasets: [
            {
              data: data.prices.map((p) => p[1]),
              borderColor: "#60a5fa",
              tension: 0.4,
            },
          ],
        });
      });
  }, []);

  return (
    <div>
      <h2 className="text-3xl font-bold mb-6">Dashboard</h2>

      {/* 🔹 P&L SUMMARY */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card title="Total Invested" value={`₹${summary.invested.toLocaleString()}`} />
        <Card title="Current Value" value={`₹${summary.current.toLocaleString()}`} />
        <Card
          title="Unrealized P&L"
          value={`₹${summary.pnl.toLocaleString()}`}
          color={summary.pnl >= 0 ? "text-green-400" : "text-red-400"}
        />
        <Card
          title="P&L %"
          value={`${summary.percent}%`}
          color={summary.pnl >= 0 ? "text-green-400" : "text-red-400"}
        />
      </div>

      {/* 🔹 SNAPSHOT CARDS (BACK AGAIN) */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        {Object.keys(topPrices).map((coin) => (
          <Card
            key={coin}
            title={coin.toUpperCase()}
            value={`₹${topPrices[coin].inr.toLocaleString()}`}
          />
        ))}
      </div>

      {/* 🔹 CHART */}
      <div className="bg-white/10 backdrop-blur-md p-6 rounded-xl">
        <h3 className="text-xl font-semibold mb-4">
          Bitcoin Price (Last 7 Days)
        </h3>
        {chartData ? <Line data={chartData} /> : "Loading chart..."}
      </div>
    </div>
  );
}

function Card({ title, value, color = "text-white" }) {
  return (
    <div className="bg-white/10 backdrop-blur-md p-6 rounded-xl">
      <p className="text-white/60">{title}</p>
      <h3 className={`text-2xl font-bold ${color}`}>{value}</h3>
    </div>
  );
}

export default DashboardHome;
