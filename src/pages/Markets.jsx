import { useEffect, useState } from "react";

function Markets() {
  const [coins, setCoins] = useState([]);
  const [watchlist, setWatchlist] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Load markets (ALL coins – like before)
    fetch(
      "https://api.coingecko.com/api/v3/coins/markets?vs_currency=inr&order=market_cap_desc&per_page=50&page=1"
    )
      .then((res) => res.json())
      .then((data) => setCoins(data))
      .finally(() => setLoading(false));

    // Load watchlist
    const saved = JSON.parse(localStorage.getItem("watchlist")) || [];
    setWatchlist(saved);
  }, []);

  const toggleWatchlist = (coin) => {
    let updated;

    if (watchlist.some((c) => c.id === coin.id)) {
      // REMOVE
      updated = watchlist.filter((c) => c.id !== coin.id);
    } else {
      // ADD
      updated = [...watchlist, { id: coin.id, name: coin.name }];
    }

    setWatchlist(updated);
    localStorage.setItem("watchlist", JSON.stringify(updated));
  };

  return (
    <div>
      <h2 className="text-3xl font-bold mb-6">Markets</h2>

      <div className="bg-white/10 backdrop-blur-md p-6 rounded-xl">
        {loading ? (
          <p className="text-white/70 text-center">Loading markets…</p>
        ) : (
          <table className="w-full text-left">
            <thead className="border-b border-white/20 text-white/70">
              <tr>
                <th>Coin</th>
                <th>Price (₹)</th>
                <th>24h</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {coins.map((coin) => {
                const isAdded = watchlist.some(
                  (c) => c.id === coin.id
                );

                return (
                  <tr key={coin.id} className="border-b border-white/10">
                    <td className="py-3 flex items-center gap-2">
                      <img
                        src={coin.image}
                        alt={coin.name}
                        className="w-6 h-6"
                      />
                      {coin.name}
                    </td>
                    <td>
                      ₹{Math.round(coin.current_price).toLocaleString()}
                    </td>
                    <td
                      className={
                        coin.price_change_percentage_24h >= 0
                          ? "text-green-400"
                          : "text-red-400"
                      }
                    >
                      {coin.price_change_percentage_24h.toFixed(2)}%
                    </td>
                    <td>
                      <button
                        onClick={() => toggleWatchlist(coin)}
                        className={`px-3 py-1 rounded-lg text-sm font-semibold ${
                          isAdded
                            ? "bg-red-600 hover:bg-red-700"
                            : "bg-blue-600 hover:bg-blue-700"
                        } text-white`}
                      >
                        {isAdded ? "Remove" : "Add"}
                      </button>
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

export default Markets;
