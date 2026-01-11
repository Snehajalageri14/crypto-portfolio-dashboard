import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Splash from "./pages/Splash";
import Login from "./pages/Login";
import DashboardLayout from "./pages/DashboardLayout";

import DashboardHome from "./pages/DashboardHome";
import Portfolio from "./pages/Portfolio";
import Markets from "./pages/Markets";
import Watchlist from "./pages/Watchlist";
import Transactions from "./pages/Transactions";
import Analytics from "./pages/Analytics";
import Alerts from "./pages/Alerts";
import LearningHub from "./pages/LearningHub";
import Settings from "./pages/Settings";

// Protected Route Component
function ProtectedRoute({ children }) {
  const isAuth = localStorage.getItem("isAuth") === "true";
  return isAuth ? children : <Navigate to="/login" replace />;
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Splash */}
        <Route path="/" element={<Splash />} />

        {/* Login */}
        <Route path="/login" element={<Login />} />

        {/* Protected Dashboard */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<DashboardHome />} />
          <Route path="portfolio" element={<Portfolio />} />
          <Route path="markets" element={<Markets />} />
          <Route path="watchlist" element={<Watchlist />} />
          <Route path="transactions" element={<Transactions />} />
          <Route path="analytics" element={<Analytics />} />
          <Route path="alerts" element={<Alerts />} />
          <Route path="learning" element={<LearningHub />} />
          <Route path="settings" element={<Settings />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
