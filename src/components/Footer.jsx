import React from "react";
import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-b from-black via-gray-900 to-black text-gray-300 mt-16">
      <div className="max-w-7xl mx-auto px-6 py-14 grid md:grid-cols-4 gap-10">

        {/* 🔥 Logo + About */}
        <div>
          <h2 className="text-3xl font-bold text-white tracking-wide">
            DSA Platform
          </h2>
          <p className="mt-4 text-sm text-gray-400 leading-relaxed">
            Practice DSA problems, track your progress, and become interview ready 🚀
          </p>

          {/* Social Icons */}
          <div className="flex gap-4 mt-5 text-xl">
            <a href="#" className="hover:text-white hover:scale-110 transition">
              <FaGithub />
            </a>
            <a href="#" className="hover:text-blue-500 hover:scale-110 transition">
              <FaLinkedin />
            </a>
            <a href="#" className="hover:text-sky-400 hover:scale-110 transition">
              <FaTwitter />
            </a>
          </div>
        </div>

        {/* 📚 Quick Links */}
        <div>
          <h3 className="text-white font-semibold mb-4 text-lg">Quick Links</h3>
          <ul className="space-y-3 text-sm">
            {["Problems", "Dashboard", "Topics", "Leaderboard"].map((item) => (
              <li key={item}>
                <a
                  href={`/${item.toLowerCase()}`}
                  className="hover:text-white transition hover:translate-x-1 inline-block"
                >
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* 🛠 Resources */}
        <div>
          <h3 className="text-white font-semibold mb-4 text-lg">Resources</h3>
          <ul className="space-y-3 text-sm">
            {["Notes", "Blogs", "About", "Contact"].map((item) => (
              <li key={item}>
                <a
                  href={`/${item.toLowerCase()}`}
                  className="hover:text-white transition hover:translate-x-1 inline-block"
                >
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* 📩 Newsletter */}
        <div>
          <h3 className="text-white font-semibold mb-4 text-lg">
            Stay Updated
          </h3>
          <p className="text-sm text-gray-400 mb-4">
            Get coding tips & resources directly to your inbox.
          </p>

          <div className="flex items-center bg-gray-800 rounded-lg overflow-hidden">
            <input
              type="email"
              placeholder="Enter email"
              className="bg-transparent px-3 py-2 text-sm outline-none w-full"
            />
            <button className="bg-blue-600 px-4 py-2 text-sm text-white hover:bg-blue-700 transition">
              Subscribe
            </button>
          </div>
        </div>
      </div>

      {/* 🔻 Bottom */}
      <div className="border-t border-gray-800 text-center py-5 text-sm text-gray-500">
        © {new Date().getFullYear()} DSA Platform. Built with ❤️ for coders.
      </div>
    </footer>
  );
};

export default Footer;