import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { FiMenu, FiX, FiSearch } from "react-icons/fi";
import { FaCrown } from "react-icons/fa";
import { useAuth } from "../context/AuthContext";
import SearchBar from "./SearchBar";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [showPricing, setShowPricing] = useState(false);
  const { user, logoutUser } = useAuth();
  const location = useLocation();

  const navItems = [
    { path: "/", label: "Explore" },
    { path: "/topics", label: "Problems" },
    { path: "/dashboard", label: "Progress" },
    { path: "/create-problem", label: "Create-problems" },

  ];

  return (
    <>
      <nav className="bg-[#1a1a1a] text-white border-b border-gray-800 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">

          {/* LEFT */}
          <div className="flex items-center space-x-6">
            <h1 className="text-lg font-bold text-yellow-400 cursor-pointer">
              DSA<span className="text-white">Champs</span>
            </h1>

            {/* Desktop Nav */}
            <div className="hidden md:flex space-x-5">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`text-sm transition ${location.pathname === item.path
                      ? "text-white border-b-2 border-yellow-400 pb-1"
                      : "text-gray-400 hover:text-white"
                    }`}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          {/* CENTER: Search */}
       <div className="hidden md:flex">
  <SearchBar />
</div>

          {/* RIGHT */}
          {/* RIGHT */}
          <div className="hidden md:flex items-center space-x-4 relative">

            {/* 👑 Premium */}
            <button
              onClick={() => setShowPricing(true)}
              className="flex items-center gap-2 bg-yellow-400 text-black px-3 py-1 rounded-lg text-sm font-medium hover:bg-yellow-300 transition"
            >
              <FaCrown />
              Premium
            </button>

            {/* 🔥 AUTH LOGIC */}
            {user ? (
              <>
                {/* PROFILE */}
                <div
                  onClick={() => setProfileOpen(!profileOpen)}
                  className="flex items-center space-x-3 cursor-pointer hover:bg-[#2a2a2a] px-2 py-1 rounded-lg transition"
                >
                  <img
                    src="https://i.pravatar.cc/40"
                    alt="profile"
                    className="w-8 h-8 rounded-full border border-gray-600"
                  />
                  <span className="text-sm font-medium">{user.name}</span>
                </div>

                {/* DROPDOWN */}
                {profileOpen && (
                  <div className="absolute right-0 top-12 bg-[#2a2a2a] rounded-xl shadow-lg w-48 py-2 border border-gray-700">

                    <div className="px-4 py-2 border-b border-gray-700">
                      <p className="text-sm font-medium">{user.name}</p>
                      <p className="text-xs text-gray-400">{user.email}</p>
                    </div>

                    <Link className="block px-4 py-2 hover:bg-gray-700 text-sm">
                      Profile
                    </Link>

                    <Link className="block px-4 py-2 hover:bg-gray-700 text-sm">
                      My Progress
                    </Link>

                    <div className="border-t border-gray-700 my-1"></div>

                    <button
                      onClick={logoutUser}
                      className="w-full text-left px-4 py-2 hover:bg-gray-700 text-sm text-red-400"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </>
            ) : (
              // 🔥 NOT LOGGED IN
              <Link
                to="/login"
                className="bg-yellow-400 text-black px-4 py-1 rounded-lg text-sm font-medium hover:bg-yellow-300 transition"
              >
                Login
              </Link>
            )}
          </div>

          {/* MOBILE BUTTON */}
          <button
            className="md:hidden text-xl"
            onClick={() => setOpen(!open)}
          >
            {open ? <FiX /> : <FiMenu />}
          </button>
        </div>

        {/* MOBILE MENU */}
        {open && (
          <div className="md:hidden px-4 pb-4 space-y-4 bg-[#1a1a1a]">

            {/* Search */}
            <div className="flex items-center bg-[#2a2a2a] px-3 py-2 rounded-lg">
              <FiSearch className="text-gray-400 mr-2" />
              <input
                type="text"
                placeholder="Search..."
                className="bg-transparent outline-none text-sm w-full text-white"
              />
            </div>

            {/* Links */}
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setOpen(false)}
                className="block text-gray-300 hover:text-white"
              >
                {item.label}
              </Link>
            ))}

            {/* Premium Button */}
            <button
              onClick={() => setShowPricing(true)}
              className="w-full flex items-center justify-center gap-2 bg-yellow-400 text-black py-2 rounded-lg"
            >
              <FaCrown />
              Premium
            </button>

            {/* Profile */}
            <div className="flex items-center space-x-3 pt-3 border-t border-gray-700">
              <img
                src="https://i.pravatar.cc/40"
                alt="profile"
                className="w-8 h-8 rounded-full"
              />
              <span>Harsh</span>
            </div>
          </div>
        )}
      </nav>

      {/* 💳 PRICING MODAL */}
      {showPricing && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
          <div className="bg-white text-black rounded-xl p-6 w-80 relative">

            {/* Close */}
            <button
              onClick={() => setShowPricing(false)}
              className="absolute top-2 right-3 text-xl"
            >
              ×
            </button>

            <h2 className="text-xl font-bold mb-4">Upgrade to Premium 👑</h2>

            <div className="space-y-3 text-sm">
              <p>✅ Unlimited problem access</p>
              <p>✅ AI hints & explanations</p>
              <p>✅ Advanced progress tracking</p>
            </div>

            <div className="mt-4 text-lg font-bold">
              ₹199/month
            </div>

            <button className="mt-4 w-full bg-yellow-400 py-2 rounded-lg font-medium hover:bg-yellow-300">
              Buy Now
            </button>
          </div>
        </div>
      )}
    </>
  );
}