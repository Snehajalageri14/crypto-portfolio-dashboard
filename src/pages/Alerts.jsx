import { useEffect, useState } from "react";

function Alerts() {
  const [watchlist, setWatchlist] = useState([]);
  const [selectedCoin, setSelectedCoin] = useState("");
  const [currentPrice, setCurrentPrice] = useState(null);
  const [targetPrice, setTargetPrice] = useState("");
  const [condition, setCondition] = useState("above");
  const [alerts, setAlerts] = useState([]);

  // Load watchlist & alerts
  useEffect(() => {
    setWatchlist(JSON.parse(localStorage.getItem("watchlist")) || []);
    setAlerts(JSON.parse(localStorage.getItem("alerts")) || []);
  }, []);

  // Fetch current price
  useEffect(() => {
    if (!selectedCoin) return;

    fetch(
      `https://api.coingecko.com/api/v3/simple/price?ids=${selectedCoin}&vs_currencies=inr`
    )
      .then((res) => res.json())
      .then((data) => {
        setCurrentPrice(data[selectedCoin]?.inr || null);
      });
  }, [selectedCoin]);

  // Price checker (every 30s)
  useEffect(() => {
    const interval = setInterval(() => {
      alerts.forEach((alert) => {
        fetch(
          `https://api.coingecko.com/api/v3/simple/price?ids=${alert.coinId}&vs_currencies=inr`
        )
          .then((res) => res.json())
          .then((data) => {
            const price = data[alert.coinId]?.inr;

            if (
              (alert.condition === "above" && price >= alert.price) ||
              (alert.condition === "below" && price <= alert.price)
            ) {
              notify(alert.coinName, price);
              removeAlert(alert.id);
            }
          });
      });
    }, 30000);

    return () => clearInterval(interval);
  }, [alerts]);

  const notify = (coin, price) => {
    if (Notification.permission === "granted") {
      new Notification("Price Alert 🚨", {
        body: `${coin} reached ₹${price.toLocaleString()}`,
      });
    } else {
      Notification.requestPermission();
    }
  };

  const addAlert = () => {
    if (!selectedCoin || !targetPrice) return;

    const coin = watchlist.find((c) => c.id === selectedCoin);

    const newAlert = {
      id: Date.now(),
      coinId: coin.id,
      coinName: coin.name,
      price: Number(targetPrice),
      condition,
    };

    const updated = [...alerts, newAlert];
    setAlerts(updated);
    localStorage.setItem("alerts", JSON.stringify(updated));

    setTargetPrice("");
  };

  const removeAlert = (id) => {
    const updated = alerts.filter((a) => a.id !== id);
    setAlerts(updated);
    localStorage.setItem("alerts", JSON.stringify(updated));
  };

  return (
    <div>
      <h2 className="text-3xl font-bold mb-6">Price Alerts</h2>

      {/* Create Alert */}
      <div className="bg-white/10 backdrop-blur-md p-6 rounded-xl mb-8">
        <div className="flex gap-4 flex-wrap items-center">
          <select
            value={selectedCoin}
            onChange={(e) => setSelectedCoin(e.target.value)}
            className="p-3 rounded-lg bg-blue-600/40 text-white"
          >
            <option value="">Select coin</option>
            {watchlist.map((coin) => (
              <option key={coin.id} value={coin.id} className="bg-black">
                {coin.name}
              </option>
            ))}
          </select>

          {currentPrice && (
            <span className="text-white/80">
              Current: ₹{currentPrice.toLocaleString()}
            </span>
          )}

          <select
            value={condition}
            onChange={(e) => setCondition(e.target.value)}
            className="p-3 rounded-lg bg-blue-600/40 text-white"
          >
            <option value="above" className="bg-black">Above</option>
            <option value="below" className="bg-black">Below</option>
          </select>

          <input
            type="number"
            placeholder="Trigger price"
            value={targetPrice}
            onChange={(e) => setTargetPrice(e.target.value)}
            className="p-3 rounded-lg bg-blue-600/40 text-white"
          />

          <button
            onClick={addAlert}
            className="px-6 py-3 bg-blue-600 rounded-lg"
          >
            Set Alert
          </button>
        </div>
      </div>

      {/* Active Alerts */}
      <div className="bg-white/10 backdrop-blur-md p-6 rounded-xl">
        <h3 className="text-xl font-semibold mb-4">Active Alerts</h3>

        {alerts.length === 0 ? (
          <p className="text-white/70">No alerts set.</p>
        ) : (
          alerts.map((alert) => (
            <div
              key={alert.id}
              className="flex justify-between items-center mb-3 bg-black/30 p-3 rounded-lg"
            >
              <span>
                {alert.coinName} {alert.condition} ₹{alert.price}
              </span>
              <button
                onClick={() => removeAlert(alert.id)}
                className="text-red-400"
              >
                Remove
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Alerts;
