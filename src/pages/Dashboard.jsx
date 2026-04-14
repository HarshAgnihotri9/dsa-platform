import { useEffect, useState } from "react";
import { topics } from "../data/topics";
import Courses from "./Courses";
import {BASE_URL} from '../api/problemApi'

export default function Dashboard() {
  const [data, setData] = useState(null);

  // 🔥 Fetch dashboard data
useEffect(() => {
  const fetchDashboard = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await fetch(`${BASE_URL}/api/dashboard`, {
        headers: {
          Authorization: token, // 🔥 send token
        },
      });

      const json = await res.json();

      if (!json.success) {
        console.error("API Error:", json);
        return;
      }

      setData(json.data);

    } catch (err) {
      console.error("Fetch error:", err);
    }
  };

  fetchDashboard();
}, []);

  if (!data) {
    return (
      <div className="bg-[#0b0b0b] text-white min-h-screen flex items-center justify-center">
        Loading Dashboard...
      </div>
    );
  }

  const total = data.totalProblems;
  const solvedCount = data.solvedProblems;
  const percentage = data.progress.percentage;

  return (
    <div className="bg-[#0b0b0b] text-white min-h-screen px-6 py-10">

      {/* HEADER */}
      <div className="mb-10">
        <h1 className="text-4xl font-bold">Dashboard</h1>
        <p className="text-gray-400 mt-2">
          Track your DSA journey and improve daily 🚀
        </p>
      </div>

      {/* 🔥 MAIN STATS */}
      <div className="grid md:grid-cols-3 gap-6 mb-10">

        <div className="bg-[#141414] border border-gray-800 rounded-xl p-6 hover:border-yellow-400 transition">
          <p className="text-gray-400 text-sm">Solved</p>
          <h2 className="text-3xl font-bold mt-2 text-yellow-400">
            {solvedCount}
          </h2>
        </div>

        <div className="bg-[#141414] border border-gray-800 rounded-xl p-6 hover:border-yellow-400 transition">
          <p className="text-gray-400 text-sm">Total Problems</p>
          <h2 className="text-3xl font-bold mt-2">
            {total}
          </h2>
        </div>

        <div className="bg-[#141414] border border-gray-800 rounded-xl p-6 hover:border-yellow-400 transition">
          <p className="text-gray-400 text-sm">Progress</p>
          <h2 className="text-3xl font-bold mt-2 text-green-400">
            {percentage}%
          </h2>
        </div>

      </div>

      {/* 🔥 DIFFICULTY STATS */}
      <div className="grid md:grid-cols-3 gap-6 mb-10">

        <div className="bg-[#141414] p-5 rounded-xl border border-gray-800">
          <p className="text-green-400 text-sm">Easy</p>
          <h2 className="text-2xl font-bold">
            {data.difficulty.Easy}
          </h2>
        </div>

        <div className="bg-[#141414] p-5 rounded-xl border border-gray-800">
          <p className="text-yellow-400 text-sm">Medium</p>
          <h2 className="text-2xl font-bold">
            {data.difficulty.Medium}
          </h2>
        </div>

        <div className="bg-[#141414] p-5 rounded-xl border border-gray-800">
          <p className="text-red-400 text-sm">Hard</p>
          <h2 className="text-2xl font-bold">
            {data.difficulty.Hard}
          </h2>
        </div>

      </div>

      {/* 🔥 PROGRESS BAR */}
      <div className="bg-[#141414] border border-gray-800 rounded-2xl p-6 mb-12">

        <div className="flex justify-between mb-3">
          <h2 className="text-lg font-semibold">Overall Completion</h2>
          <span className="text-yellow-400 font-semibold">
            {percentage}%
          </span>
        </div>

        <div className="w-full bg-gray-800 h-4 rounded-full overflow-hidden">
          <div
            className="h-4 bg-gradient-to-r from-yellow-400 to-orange-500 transition-all"
            style={{ width: `${percentage}%` }}
          ></div>
        </div>

        <p className="text-sm text-gray-400 mt-2">
          {solvedCount} out of {total} problems solved
        </p>
      </div>

      {/* 🔥 TOPIC SECTION (STATIC FOR NOW) */}
      {/* <div>
        <h2 className="text-2xl font-semibold mb-6">
          Topic Breakdown
        </h2>

        <div className="grid md:grid-cols-2 gap-6">

          {topics.map((topic) => (
            <div
              key={topic.id}
              className="bg-[#141414] rounded-xl p-5 border border-gray-800"
            >
              <h3 className="font-medium">{topic.name}</h3>
              <p className="text-sm text-gray-400 mt-2">
                Coming soon...
              </p>
            </div>
          ))}

        </div>
      </div> */}

      <Courses/>

    </div>
  );
}