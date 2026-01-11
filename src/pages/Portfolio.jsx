import { useEffect, useState } from "react";

export default function Portfolio() {
  const [watchlist, setWatchlist] = useState([]);
  const [selectedCoin, setSelectedCoin] = useState("");
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState(null);
  const [portfolio, setPortfolio] = useState([]);

  /* Load watchlist from localStorage */
  useEffect(() => {
    const wl = JSON.parse(localStorage.getItem("watchlist")) || [];
    setWatchlist(wl);
  }, []);

  /* Fetch price when coin changes */
  useEffect(() => {
    if (!selectedCoin) return;

    fetch(
      `https://api.coingecko.com/api/v3/simple/price?ids=${selectedCoin}&vs_currencies=inr`
    )
      .then((res) => res.json())
      .then((data) => {
        setPrice(data[selectedCoin]?.inr || 0);
      });
  }, [selectedCoin]);

  const handleAdd = () => {
    if (!selectedCoin || !quantity || !price) return;

    setPortfolio([
      ...portfolio,
      {
        coin: selectedCoin,
        qty: quantity,
        price
      }
    ]);

    setQuantity("");
  };

  return (
    <div className="p-6 text-white">
      <h1 className="text-3xl font-bold mb-6">Portfolio</h1>

      {/* ADD SECTION */}
      <div className="bg-blue-500/30 rounded-xl p-6 mb-8 flex gap-4 flex-wrap items-center">

        {/* COIN DROPDOWN */}
        <select
          value={selectedCoin}
          onChange={(e) => setSelectedCoin(e.target.value)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg border border-white/30 focus:outline-none focus:ring-2 focus:ring-blue-300"
        >
          <option value="">Select coin</option>
          {watchlist.map((coin) => (
            <option
              key={coin.id}
              value={coin.id}
              className="bg-blue-700 text-white"
            >
              {coin.name}
            </option>
          ))}
        </select>

        {/* QUANTITY */}
        <input
          type="number"
          placeholder="Quantity"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg border border-white/30 placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-blue-300"
        />

        {/* BUY PRICE (AUTO) */}
        <input
          type="text"
          value={price ? `₹${price}` : "Price"}
          disabled
          className="bg-blue-700 text-white px-4 py-2 rounded-lg border border-white/20 cursor-not-allowed"
        />

        <button
          onClick={handleAdd}
          className="bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded-lg font-semibold"
        >
          Add
        </button>
      </div>

      {/* TABLE */}
      <div className="bg-blue-500/30 rounded-xl p-6">
        <table className="w-full text-left">
          <thead className="border-b border-white/20">
            <tr>
              <th className="py-2">Coin</th>
              <th>Quantity</th>
              <th>Buy Price (₹)</th>
            </tr>
          </thead>
          <tbody>
            {portfolio.length === 0 ? (
              <tr>
                <td colSpan="3" className="py-4 text-white/70">
                  No assets added yet
                </td>
              </tr>
            ) : (
              portfolio.map((p, i) => (
                <tr key={i} className="border-b border-white/10">
                  <td className="py-2 capitalize">{p.coin}</td>
                  <td>{p.qty}</td>
                  <td>₹{p.price}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
