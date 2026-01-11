import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useState } from "react";

/* SVG ICONS */
const DashboardIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
    <path d="M3 3h7v7H3V3Zm11 0h7v7h-7V3ZM3 14h7v7H3v-7Zm11 0h7v7h-7v-7Z"
      stroke="currentColor" strokeWidth="2" />
  </svg>
);

const PortfolioIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
    <rect x="3" y="7" width="18" height="13" rx="2"
      stroke="currentColor" strokeWidth="2" />
    <path d="M9 7V5h6v2"
      stroke="currentColor" strokeWidth="2" />
  </svg>
);

const MarketsIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
    <path d="M4 18V6M10 18V10M16 18V4M22 18H2"
      stroke="currentColor" strokeWidth="2" />
  </svg>
);

const WatchlistIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
    <path d="M12 17.3l-6.2 3.7 1.7-7.1L2 9.2l7.3-.6L12 2l2.7 6.6 7.3.6-5.5 4.7 1.7 7.1L12 17.3Z"
      stroke="currentColor" strokeWidth="2" />
  </svg>
);

const TransactionsIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
    <path d="M4 7h16M4 17h16M7 10v4M17 10v4"
      stroke="currentColor" strokeWidth="2" />
  </svg>
);

const AnalyticsIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
    <path d="M4 18h16M7 15V9M12 15V5M17 15v-3"
      stroke="currentColor" strokeWidth="2" />
  </svg>
);

const AlertsIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
    <path d="M18 8a6 6 0 10-12 0c0 7-3 7-3 7h18s-3 0-3-7Z"
      stroke="currentColor" strokeWidth="2" />
    <path d="M13.7 21a2 2 0 01-3.4 0"
      stroke="currentColor" strokeWidth="2" />
  </svg>
);

const LearningIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
    <path d="M3 6l9-4 9 4-9 4-9-4Z"
      stroke="currentColor" strokeWidth="2" />
    <path d="M3 10l9 4 9-4"
      stroke="currentColor" strokeWidth="2" />
  </svg>
);

const SettingsIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="12" r="3"
      stroke="currentColor" strokeWidth="2" />
    <path d="M19.4 15a1.7 1.7 0 00.3 1.9l.1.1-1.8 3.1-0.1-.1a1.7 1.7 0 00-2-.3 1.7 1.7 0 00-1 1.6V22h-3.6v-.1a1.7 1.7 0 00-1-1.6 1.7 1.7 0 00-2 .3l-.1.1-1.8-3.1.1-.1a1.7 1.7 0 00.3-1.9 1.7 1.7 0 00-1.6-1H2v-3.6h.1a1.7 1.7 0 001.6-1 1.7 1.7 0 00-.3-2l-.1-.1L5.1 2l.1.1a1.7 1.7 0 002 .3h.1a1.7 1.7 0 001-1.6V1h3.6v.1a1.7 1.7 0 001 1.6h.1a1.7 1.7 0 002-.3l.1-.1 1.8 3.1-.1.1a1.7 1.7 0 00-.3 2v.1a1.7 1.7 0 001.6 1H22v3.6h-.1a1.7 1.7 0 00-1.6 1Z"
      stroke="currentColor" strokeWidth="2" />
  </svg>
);

function DashboardLayout() {
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("isAuth");
    navigate("/login");
  };

  const base =
    "flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-blue-600/40 transition";
  const active = "bg-blue-600/60";

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-blue-900 via-blue-700 to-blue-500">

      <aside
        className={`bg-black/30 backdrop-blur-md p-6 text-white transition-all duration-300 ${
          collapsed ? "w-20" : "w-64"
        }`}
      >
        <div className="flex items-center justify-between mb-8">
          {!collapsed && <h1 className="text-xl font-bold">Crypto App</h1>}
          <button onClick={() => setCollapsed(!collapsed)}>☰</button>
        </div>

        <nav className="space-y-2">
          <NavLink to="" end className={({ isActive }) => `${base} ${isActive ? active : ""}`}>
            <DashboardIcon /> {!collapsed && "Dashboard"}
          </NavLink>

          <NavLink to="portfolio" className={({ isActive }) => `${base} ${isActive ? active : ""}`}>
            <PortfolioIcon /> {!collapsed && "Portfolio"}
          </NavLink>

          <NavLink to="markets" className={({ isActive }) => `${base} ${isActive ? active : ""}`}>
            <MarketsIcon /> {!collapsed && "Markets"}
          </NavLink>

          <NavLink to="watchlist" className={({ isActive }) => `${base} ${isActive ? active : ""}`}>
            <WatchlistIcon /> {!collapsed && "Watchlist"}
          </NavLink>

          <NavLink to="transactions" className={({ isActive }) => `${base} ${isActive ? active : ""}`}>
            <TransactionsIcon /> {!collapsed && "Transactions"}
          </NavLink>

          <NavLink to="analytics" className={({ isActive }) => `${base} ${isActive ? active : ""}`}>
            <AnalyticsIcon /> {!collapsed && "Analytics"}
          </NavLink>

          <NavLink to="alerts" className={({ isActive }) => `${base} ${isActive ? active : ""}`}>
            <AlertsIcon /> {!collapsed && "Alerts"}
          </NavLink>

          <NavLink to="learning" className={({ isActive }) => `${base} ${isActive ? active : ""}`}>
            <LearningIcon /> {!collapsed && "Learning Hub"}
          </NavLink>

          <NavLink to="settings" className={({ isActive }) => `${base} ${isActive ? active : ""}`}>
            <SettingsIcon /> {!collapsed && "Settings"}
          </NavLink>
        </nav>

        <button
          onClick={handleLogout}
          className="mt-8 w-full bg-red-600/80 hover:bg-red-600 py-2 rounded-lg"
        >
          {!collapsed ? "Logout" : "⎋"}
        </button>
      </aside>

      <main className="flex-1 p-10 text-white overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
}

export default DashboardLayout;
