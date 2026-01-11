import { useEffect, useState } from "react";

function Watchlist() {
  const [watchlist, setWatchlist] = useState([]);
  const [prices, setPrices] = useState({});

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("watchlist")) || [];
    setWatchlist(saved);
  }, []);

  useEffect(() => {
    if (watchlist.length === 0) return;

    const ids = watchlist.map((c) => c.id).join(",");

    fetch(
      `https://api.coingecko.com/api/v3/simple/price?ids=${ids}&vs_currencies=inr&include_24hr_change=true`
    )
      .then((res) => res.json())
      .then(setPrices);
  }, [watchlist]);

  return (
    <div>
      <h2 className="text-3xl font-bold mb-6">Watchlist</h2>

      <div className="bg-white/10 backdrop-blur-md p-6 rounded-xl">
        {watchlist.length === 0 ? (
          <p className="text-white/70 text-center">
            No coins added yet. Add coins from Markets.
          </p>
        ) : (
          <table className="w-full text-left">
            <thead className="border-b border-white/20 text-white/70">
              <tr>
                <th>Coin</th>
                <th>Price (₹)</th>
                <th>24h</th>
              </tr>
            </thead>
            <tbody>
              {watchlist.map((coin) => {
                const data = prices[coin.id];
                return (
                  <tr key={coin.id} className="border-b border-white/10">
                    <td className="py-3">{coin.name}</td>
                    <td>
                      {data
                        ? `₹${Math.round(data.inr).toLocaleString()}`
                        : "—"}
                    </td>
                    <td
                      className={
                        data?.inr_24h_change >= 0
                          ? "text-green-400"
                          : "text-red-400"
                      }
                    >
                      {data
                        ? `${data.inr_24h_change.toFixed(2)}%`
                        : "—"}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default Watchlist;
