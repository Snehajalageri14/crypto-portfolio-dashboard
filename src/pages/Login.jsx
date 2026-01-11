import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleLogin = () => {
    // Simulate successful login
    localStorage.setItem("isAuth", "true");
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-900 via-blue-700 to-blue-500">
      <div className="backdrop-blur-md bg-white/10 p-10 rounded-xl w-96 shadow-xl">

        <h2 className="text-3xl font-bold text-white text-center mb-8 flex items-center justify-center gap-3">
          Welcome
          <span className="w-10 h-10 flex items-center justify-center rounded-full
                           bg-gradient-to-br from-yellow-300 via-yellow-400 to-yellow-600
                           text-black font-extrabold shadow-lg">
            ₿
          </span>
        </h2>

        <input
          type="email"
          placeholder="Email"
          className="w-full p-3 mb-4 rounded-lg bg-white/20 text-white placeholder-white/70"
        />

        <div className="relative mb-6">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            className="w-full p-3 pr-12 rounded-lg bg-white/20 text-white placeholder-white/70"
          />

          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-white/80"
          >
            👁️
          </button>
        </div>

        <button
          onClick={handleLogin}
          className="w-full bg-blue-600 hover:bg-blue-500 text-white py-3 rounded-lg font-semibold"
        >
          Login
        </button>

        <div className="mt-6 text-center space-y-2">
          <p className="text-white/90 text-sm hover:underline cursor-pointer">
            Create new account
          </p>
          <p className="text-white/70 text-sm hover:underline cursor-pointer">
            Forgot password?
          </p>
        </div>

      </div>
    </div>
  );
}

export default Login;
