import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const { loginUser } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!form.email.trim() || !form.password.trim()) {
      return setError("All fields are required");
    }

    try {
      setLoading(true);
      setError("");

      const res = await fetch("http://localhost:8080/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.message || "Login failed");
      }

      loginUser(data);
      navigate("/dashboard");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-[#0a0a0a] text-white">

      {/* LEFT SIDE (Branding) */}
      <div className="hidden md:flex w-1/2 flex-col justify-center px-16 bg-gradient-to-br from-yellow-500/10 to-transparent">
        <h1 className="text-5xl font-bold leading-tight">
          Crack DSA <br />
          <span className="text-yellow-400">Like a Pro 🚀</span>
        </h1>

        <p className="text-gray-400 mt-6 max-w-md">
          Master Data Structures & Algorithms with structured learning,
          real problems, and progress tracking.
        </p>

        <div className="mt-10 space-y-3 text-sm text-gray-500">
          <p>✔ 150+ curated problems</p>
          <p>✔ Topic-wise learning</p>
          <p>✔ Track your progress</p>
        </div>
      </div>

      {/* RIGHT SIDE (Form) */}
      <div className="flex w-full md:w-1/2 items-center justify-center px-6">
        <div className="w-full max-w-md">

          {/* Card */}
          <div className="bg-[#111111] border border-gray-800 rounded-2xl p-8 shadow-2xl">

            <h2 className="text-3xl font-semibold mb-2">
              Welcome Back 👋
            </h2>
            <p className="text-gray-400 mb-6 text-sm">
              Login to continue your journey
            </p>

            {error && (
              <div className="bg-red-500/10 border border-red-500/30 text-red-400 p-3 rounded-lg mb-4 text-sm">
                {error}
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-5">

              {/* Email */}
              <div>
                <label className="text-sm text-gray-400">Email</label>
                <input
                  name="email"
                  type="email"
                  placeholder="you@example.com"
                  value={form.email}
                  onChange={handleChange}
                  className="w-full mt-2 p-3 rounded-lg bg-[#1a1a1a] border border-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-500 transition"
                />
              </div>

              {/* Password */}
              <div>
                <label className="text-sm text-gray-400">Password</label>
                <div className="relative mt-2">
                  <input
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={form.password}
                    onChange={handleChange}
                    className="w-full p-3 rounded-lg bg-[#1a1a1a] border border-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-500 pr-12"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3 text-gray-400 text-sm"
                  >
                    {showPassword ? "Hide" : "Show"}
                  </button>
                </div>
              </div>

              {/* Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 rounded-lg font-semibold bg-yellow-500 hover:bg-yellow-400 text-black transition disabled:bg-gray-700 disabled:text-gray-400"
              >
                {loading ? "Logging in..." : "Login"}
              </button>
            </form>

            {/* Footer */}
            <p className="text-center text-gray-500 text-sm mt-6">
              Don’t have an account?{" "}
              <span
                onClick={() => navigate("/signup")}
                className="text-yellow-400 cursor-pointer hover:underline"
              >
                Sign up
              </span>
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}