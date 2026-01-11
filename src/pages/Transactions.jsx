import { useEffect, useState } from "react";

export default function Transactions() {
  const [coins, setCoins] = useState([]);
  const [type, setType] = useState("BUY");
  const [selectedCoin, setSelectedCoin] = useState("");
  const [price, setPrice] = useState(null);
  const [qty, setQty] = useState("");
  const [transactions, setTransactions] = useState([]);

  // Load market prices
  useEffect(() => {
    fetch(
      "https://api.coingecko.com/api/v3/coins/markets?vs_currency=inr&per_page=50"
    )
      .then((res) => res.json())
      .then((data) => setCoins(data));
  }, []);

  // Load transactions (append-only log)
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("transactions")) || [];
    setTransactions(saved);
  }, []);

  // Update price when coin changes
  useEffect(() => {
    const coin = coins.find((c) => c.id === selectedCoin);
    setPrice(coin ? Math.round(coin.current_price) : null);
  }, [selectedCoin, coins]);

  const handleTrade = () => {
    if (!selectedCoin || !qty || qty <= 0 || !price) {
      alert("Select coin and enter valid quantity");
      return;
    }

    const coin = coins.find((c) => c.id === selectedCoin);

    const newTx = {
      id: Date.now(),
      type,                // BUY / SELL
      coin: coin.name,     // human-readable
      qty: Number(qty),    // ALWAYS number
      price,               // price at trade time
      date: new Date().toLocaleString(),
    };

    // 🔒 APPEND ONLY (never replace)
    const updated = [...transactions, newTx];
    setTransactions(updated);
    localStorage.setItem("transactions", JSON.stringify(updated));
    setQty("");
  };

  // ✅ CSV EXPORT
  const exportCSV = () => {
    if (transactions.length === 0) {
      alert("No transactions to export");
      return;
    }

    const headers = ["Type", "Coin", "Quantity", "Price (INR)", "Date"];
    const rows = transactions.map((t) => [
      t.type,
      t.coin,
      t.qty,
      t.price,
      t.date,
    ]);

    const csv =
      [headers, ...rows].map((r) => r.join(",")).join("\n");

    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "crypto_transactions.csv";
    a.click();

    URL.revokeObjectURL(url);
  };

  return (
    <div>
      <h2 className="text-3xl font-bold mb-6">Transactions</h2>

      {/* TRADE BAR */}
      <div className="bg-white/10 backdrop-blur-md p-6 rounded-xl mb-6 flex gap-4 items-center flex-wrap">
        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg"
        >
          <option value="BUY">Buy</option>
          <option value="SELL">Sell</option>
        </select>

        <select
          value={selectedCoin}
          onChange={(e) => setSelectedCoin(e.target.value)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg"
        >
          <option value="">Select Coin</option>
          {coins.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>

        <span className="text-white font-semibold">
          Price: ₹{price ?? "--"}
        </span>

        <input
          type="number"
          placeholder="Quantity"
          value={qty}
          onChange={(e) => setQty(e.target.value)}
          className="bg-blue-500 text-white placeholder-white/70 px-4 py-2 rounded-lg focus:outline-none"
        />

        <button
          onClick={handleTrade}
          className={`px-6 py-2 rounded-lg font-semibold text-white ${
            type === "BUY"
              ? "bg-green-600 hover:bg-green-700"
              : "bg-red-600 hover:bg-red-700"
          }`}
        >
          {type}
        </button>
      </div>

      {/* HISTORY + CSV */}
      <div className="bg-white/10 backdrop-blur-md p-6 rounded-xl">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold">History</h3>
          <button
            onClick={exportCSV}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
          >
            Export CSV
          </button>
        </div>

        {transactions.length === 0 ? (
          <p className="text-white/70">No transactions yet</p>
        ) : (
          <table className="w-full text-left">
            <thead className="border-b border-white/20 text-white/70">
              <tr>
                <th>Type</th>
                <th>Coin</th>
                <th>Qty</th>
                <th>Price (₹)</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((t) => (
                <tr key={t.id} className="border-b border-white/10">
                  <td
                    className={
                      t.type === "BUY"
                        ? "text-green-400"
                        : "text-red-400"
                    }
                  >
                    {t.type}
                  </td>
                  <td>{t.coin}</td>
                  <td>{t.qty}</td>
                  <td>₹{t.price}</td>
                  <td>{t.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
