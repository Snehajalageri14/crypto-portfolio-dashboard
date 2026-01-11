import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Splash() {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/login");
    }, 2200);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="h-screen w-screen flex items-center justify-center bg-gradient-to-br from-blue-900 via-blue-700 to-indigo-800">
      
      {/* Center Card */}
      <div className="flex flex-col items-center text-center">
        
        {/* Logo */}
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-yellow-400 to-yellow-600 flex items-center justify-center shadow-lg">
            <span className="text-black font-bold text-xl">₿</span>
          </div>
          <h1 className="text-4xl font-semibold text-white tracking-wide">
            Crypto App
          </h1>
        </div>

        {/* Tagline */}
        <p className="text-blue-200 text-sm tracking-wide">
          Smart Portfolio • Live Prices • Risk Insights
        </p>

        {/* Loader */}
        <div className="mt-6 w-10 h-10 border-4 border-blue-300 border-t-transparent rounded-full animate-spin"></div>
      </div>
    </div>
  );
}
