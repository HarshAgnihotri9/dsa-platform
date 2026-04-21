import React from "react";
import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-black text-gray-300 mt-10">
      <div className="max-w-7xl mx-auto px-6 py-10 grid md:grid-cols-4 gap-8">

        {/* 🔥 Logo + About */}
        <div>
          <h2 className="text-2xl font-bold text-white">
            DSA Platform
          </h2>
          <p className="mt-3 text-sm text-gray-400">
            Practice DSA problems, track progress, and level up your coding skills 🚀
          </p>
        </div>

        {/* 📚 Quick Links */}
        <div>
          <h3 className="text-white font-semibold mb-3">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="/problems" className="hover:text-white">Problems</a></li>
            <li><a href="/dashboard" className="hover:text-white">Dashboard</a></li>
            <li><a href="/topics" className="hover:text-white">Topics</a></li>
            <li><a href="/leaderboard" className="hover:text-white">Leaderboard</a></li>
          </ul>
        </div>

        {/* 🛠 Resources */}
        <div>
          <h3 className="text-white font-semibold mb-3">Resources</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="/notes" className="hover:text-white">Notes</a></li>
            <li><a href="/blogs" className="hover:text-white">Blogs</a></li>
            <li><a href="/about" className="hover:text-white">About</a></li>
            <li><a href="/contact" className="hover:text-white">Contact</a></li>
          </ul>
        </div>

        {/* 🌐 Social Links */}
        <div>
          <h3 className="text-white font-semibold mb-3">Connect</h3>
          <div className="flex gap-4 text-lg">
            <a href="#" className="hover:text-white"><FaGithub /></a>
            <a href="#" className="hover:text-white"><FaLinkedin /></a>
            <a href="#" className="hover:text-white"><FaTwitter /></a>
          </div>
        </div>

      </div>

      {/* 🔻 Bottom */}
      <div className="border-t border-gray-800 text-center py-4 text-sm text-gray-500">
        © {new Date().getFullYear()} DSA Platform. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;