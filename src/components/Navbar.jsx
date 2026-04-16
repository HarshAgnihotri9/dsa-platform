import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi";
import { FaCrown } from "react-icons/fa";
import { useAuth } from "../context/AuthContext";
import SearchBar from "./SearchBar";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);
  const [showPricing, setShowPricing] = useState(false);

  const profileRef = useRef();
  const moreRef = useRef();

  const { user, logoutUser } = useAuth();
  const location = useLocation();

  // ✅ nav items
  const navItems = [
    { path: "/", label: "Explore" },
    { path: "/topics", label: "Problems" },
    { path: "/dashboard", label: "Progress" },
    { path: "/create-problem", label: "Create" },
  ];

  const mainNav = navItems.slice(0, 3);
  const moreNav = navItems.slice(3);

  // ✅ close dropdown on outside click
  useEffect(() => {
    function handleClick(e) {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setProfileOpen(false);
      }
      if (moreRef.current && !moreRef.current.contains(e.target)) {
        setMoreOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <>
      <nav className="bg-[#1a1a1a] text-white border-b border-gray-800 sticky top-0 z-50">

        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">

          {/* LEFT */}
          <div className="flex items-center space-x-6">

            <h1 className="text-lg font-bold text-yellow-400">
              DSA<span className="text-white">Champs</span>
            </h1>

            {/* NAV LINKS */}
            <div className="hidden md:flex items-center space-x-5">

              {mainNav.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`text-sm ${
                    location.pathname === item.path
                      ? "text-white border-b-2 border-yellow-400 pb-1"
                      : "text-gray-400 hover:text-white"
                  }`}
                >
                  {item.label}
                </Link>
              ))}

              {/* MORE */}
              {moreNav.length > 0 && (
                <div ref={moreRef} className="relative">
                  <button
                    onClick={() => setMoreOpen(!moreOpen)}
                    className="text-gray-400 hover:text-white text-sm"
                  >
                    More ▾
                  </button>

                  {moreOpen && (
                    <div className="absolute top-8 left-0 bg-[#2a2a2a] rounded-lg shadow-lg py-2 w-40 border border-gray-700 z-50">
                      {moreNav.map((item) => (
                        <Link
                          key={item.path}
                          to={item.path}
                          className="block px-4 py-2 text-sm hover:bg-gray-700"
                        >
                          {item.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              )}

            </div>
          </div>

          {/* SEARCH */}
          <div className="hidden lg:flex">
            <SearchBar />
          </div>

          {/* RIGHT */}
          <div className="hidden md:flex items-center space-x-4">

            {/* PREMIUM */}
            <button
              onClick={() => setShowPricing(true)}
              className="flex items-center gap-2 bg-yellow-400 text-black px-3 py-1 rounded-lg text-sm hover:bg-yellow-300"
            >
              <FaCrown />
              Premium
            </button>

            {/* USER */}
            {user ? (
              <div ref={profileRef} className="relative">

                {/* PROFILE BUTTON */}
                <div
                  onClick={() => setProfileOpen(!profileOpen)}
                  className="flex items-center space-x-2 cursor-pointer hover:bg-[#2a2a2a] px-2 py-1 rounded-lg"
                >
                  <div className="w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center">
                    {user.name?.[0]}
                  </div>
                  <span className="text-sm">{user.name}</span>
                </div>

                {/* DROPDOWN */}
                {profileOpen && (
                  <div className="absolute right-0 top-12 w-52 bg-[#2a2a2a] border border-gray-700 rounded-lg shadow-lg z-[999]">

                    <div className="px-4 py-3 border-b border-gray-700">
                      <p className="text-sm">{user.name}</p>
                      <p className="text-xs text-gray-400">{user.email}</p>
                    </div>

                    <Link
                      to="/profile"
                      className="block px-4 py-2 text-sm hover:bg-gray-700"
                    >
                      Profile
                    </Link>

                    <Link
                      to="/dashboard"
                      className="block px-4 py-2 text-sm hover:bg-gray-700"
                    >
                      Dashboard
                    </Link>

                    <button
                      onClick={logoutUser}
                      className="w-full text-left px-4 py-2 text-sm hover:bg-gray-700 text-red-400"
                    >
                      Logout
                    </button>

                  </div>
                )}

              </div>
            ) : (
              <Link
                to="/login"
                className="bg-yellow-400 text-black px-4 py-1 rounded-lg text-sm"
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
  <div className="fixed inset-0 z-[999] bg-black/60 backdrop-blur-sm">

    {/* PANEL */}
    <div className="fixed top-0 left-0 w-full h-full bg-[#0f0f0f] px-5 py-4 flex flex-col">

      {/* HEADER */}
      <div className="flex items-center justify-between mb-6">

        <h1 className="text-xl font-semibold tracking-wide text-yellow-400">
          DSA<span className="text-white">Champs</span>
        </h1>

        <button
          onClick={() => setOpen(false)}
          className="p-2 rounded-lg hover:bg-[#1f1f1f] transition"
        >
          <FiX className="text-xl" />
        </button>
      </div>

      {/* SEARCH */}
      <div className="mb-6">
        <div className="bg-[#1a1a1a] rounded-xl px-3 py-2 border border-gray-800">
          <SearchBar />
        </div>
      </div>

      {/* NAV LINKS */}
      <div className="flex flex-col gap-3 text-base">

        {navItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            onClick={() => setOpen(false)}
            className="px-3 py-3 rounded-xl text-gray-300 hover:text-white hover:bg-[#1f1f1f] transition"
          >
            {item.label}
          </Link>
        ))}

      </div>

      {/* PREMIUM */}
      <button
        onClick={() => setShowPricing(true)}
        className="mt-6 flex items-center justify-center gap-2 bg-yellow-400 text-black py-3 rounded-xl font-medium hover:bg-yellow-300 transition"
      >
        <FaCrown />
        Go Premium
      </button>

      {/* USER SECTION */}
      <div className="mt-auto pt-6 border-t border-gray-800">

        {user ? (
          <>
            {/* USER CARD */}
            <div className="flex items-center gap-3 mb-4 p-3 bg-[#1a1a1a] rounded-xl">

              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center text-black font-bold">
                {user.name?.[0]}
              </div>

              <div>
                <p className="text-sm font-medium">{user.name}</p>
                <p className="text-xs text-gray-400">{user.email}</p>
              </div>

            </div>

            {/* ACTIONS */}
            <div className="flex flex-col gap-2">

              <Link
                to="/profile"
                onClick={() => setOpen(false)}
                className="px-3 py-2 rounded-lg text-gray-300 hover:bg-[#1f1f1f] transition"
              >
                Profile
              </Link>

              <Link
                to="/dashboard"
                onClick={() => setOpen(false)}
                className="px-3 py-2 rounded-lg text-gray-300 hover:bg-[#1f1f1f] transition"
              >
                Dashboard
              </Link>

              <button
                onClick={() => {
                  logoutUser();
                  setOpen(false);
                }}
                className="px-3 py-2 rounded-lg text-red-400 hover:bg-[#1f1f1f] transition text-left"
              >
                Logout
              </button>

            </div>
          </>
        ) : (
          <Link
            to="/login"
            onClick={() => setOpen(false)}
            className="block text-center bg-yellow-400 text-black py-2 rounded-xl font-medium"
          >
            Login
          </Link>
        )}

      </div>

    </div>
  </div>
)}

      </nav>

      {/* MODAL */}
      {showPricing && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-[999]">
          <div className="bg-white text-black p-6 rounded-lg w-80 relative">

            <button
              onClick={() => setShowPricing(false)}
              className="absolute top-2 right-3"
            >
              ×
            </button>

            <h2 className="text-lg font-bold mb-3">Premium 👑</h2>
            <p className="text-sm mb-3">Unlock all features 🚀</p>
            <div className="font-bold mb-3">₹199/month</div>

            <button className="w-full bg-yellow-400 py-2 rounded">
              Buy Now
            </button>

          </div>
        </div>
      )}
    </>
  );
}