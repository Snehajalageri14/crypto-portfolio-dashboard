import { useEffect, useState } from "react";

function Settings() {
  const [currency, setCurrency] = useState("INR");
  const [alertsEnabled, setAlertsEnabled] = useState(true);
  const [soundEnabled, setSoundEnabled] = useState(true);

  // Load settings
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("settings"));
    if (stored) {
      setCurrency(stored.currency);
      setAlertsEnabled(stored.alertsEnabled);
      setSoundEnabled(stored.soundEnabled);
    }
  }, []);

  // Save settings
  useEffect(() => {
    localStorage.setItem(
      "settings",
      JSON.stringify({
        currency,
        alertsEnabled,
        soundEnabled,
      })
    );
  }, [currency, alertsEnabled, soundEnabled]);

  const clearData = (key, label) => {
    if (window.confirm(`Clear all ${label}?`)) {
      localStorage.removeItem(key);
      alert(`${label} cleared`);
    }
  };

  return (
    <div>
      <h2 className="text-3xl font-bold mb-8">Settings</h2>

      {/* Profile */}
      <section className="bg-white/10 backdrop-blur-md p-6 rounded-xl mb-8">
        <h3 className="text-xl font-semibold mb-4">Profile</h3>
        <div className="space-y-2 text-white/80">
          <p>
            <strong>Username:</strong> demo_user
          </p>
          <p>
            <strong>Role:</strong> Standard User
          </p>
        </div>
      </section>

      {/* Preferences */}
      <section className="bg-white/10 backdrop-blur-md p-6 rounded-xl mb-8">
        <h3 className="text-xl font-semibold mb-4">Preferences</h3>

        <div className="flex items-center gap-4 mb-4">
          <label className="w-32">Currency</label>
          <select
            value={currency}
            onChange={(e) => setCurrency(e.target.value)}
            className="p-3 rounded-lg bg-blue-600/40 text-white"
          >
            <option value="INR" className="bg-black">INR (₹)</option>
            <option value="USD" className="bg-black">USD ($)</option>
          </select>
        </div>

        <div className="flex items-center gap-4 text-white/60">
          <label className="w-32">Theme</label>
          <span>Dark (default)</span>
        </div>
      </section>

      {/* Notifications */}
      <section className="bg-white/10 backdrop-blur-md p-6 rounded-xl mb-8">
        <h3 className="text-xl font-semibold mb-4">Notifications</h3>

        <div className="flex items-center justify-between mb-4">
          <span>Enable Price Alerts</span>
          <input
            type="checkbox"
            checked={alertsEnabled}
            onChange={() => setAlertsEnabled(!alertsEnabled)}
            className="w-5 h-5"
          />
        </div>

        <div className="flex items-center justify-between">
          <span>Enable Sound</span>
          <input
            type="checkbox"
            checked={soundEnabled}
            onChange={() => setSoundEnabled(!soundEnabled)}
            className="w-5 h-5"
          />
        </div>
      </section>

      {/* Data Controls */}
      <section className="bg-white/10 backdrop-blur-md p-6 rounded-xl">
        <h3 className="text-xl font-semibold mb-4">Data Management</h3>

        <div className="space-y-3">
          <button
            onClick={() => clearData("portfolio", "Portfolio")}
            className="w-full bg-red-600/70 hover:bg-red-600 p-3 rounded-lg"
          >
            Clear Portfolio
          </button>

          <button
            onClick={() => clearData("watchlist", "Watchlist")}
            className="w-full bg-red-600/70 hover:bg-red-600 p-3 rounded-lg"
          >
            Clear Watchlist
          </button>

          <button
            onClick={() => clearData("alerts", "Alerts")}
            className="w-full bg-red-600/70 hover:bg-red-600 p-3 rounded-lg"
          >
            Clear Alerts
          </button>
        </div>
      </section>
    </div>
  );
}

export default Settings;
