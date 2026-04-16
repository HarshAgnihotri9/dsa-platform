import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useProblems } from "../hooks/useProblems";
import { getSolvedProblems } from "../utils/storage";

export default function ProblemList() {
  const { topicId } = useParams();
  const navigate = useNavigate();
  const [filter, setFilter] = useState("All");

  const { problems, loading } = useProblems();
  const solvedProblems = getSolvedProblems();

  if (loading) {
    return (
      <div className="bg-[#1a1a1a] text-white p-6">
        Loading problems...
      </div>
    );
  }
const filteredProblems = Array.isArray(problems)
  ? problems.filter((p) => {
      return (
        p.topic === topicId &&
        (filter === "All" || p.difficulty === filter)
      );
    })
  : [];

  const difficultyColor = (level) => {
    if (level === "Easy") return "text-green-400";
    if (level === "Medium") return "text-yellow-400";
    return "text-red-400";
  };

  return (
    <div className="bg-[#1a1a1a] min-h-screen text-white p-4 md:p-6">

      {/* Title */}
      <h1 className="text-2xl font-bold mb-6 capitalize">
        {topicId} Problems
      </h1>

      {/* Filters */}
      <div className="mb-4 flex gap-2">
        {["All", "Easy", "Medium", "Hard"].map((level) => (
          <button
            key={level}
            onClick={() => setFilter(level)}
            className={`px-3 py-1 rounded-md text-sm ${
              filter === level
                ? "bg-yellow-400 text-black"
                : "bg-[#2a2a2a] text-gray-300"
            }`}
          >
            {level}
          </button>
        ))}
      </div>

<div className="bg-[#141414] rounded-2xl border border-gray-800 overflow-hidden">

  {/* HEADER */}
  <div className="grid grid-cols-12 px-5 py-3 text-gray-400 text-xs uppercase tracking-wider border-b border-gray-800 bg-[#1a1a1a]">
    <div className="col-span-1">Status</div>
    <div className="col-span-7">Problem</div>
    <div className="col-span-4 text-right">Difficulty</div>
  </div>

  {/* EMPTY STATE */}
  {filteredProblems.length === 0 && (
    <div className="flex flex-col items-center justify-center py-16 text-gray-500">
      <p className="text-lg">No problems yet 😕</p>
      <p className="text-sm mt-2">Try adding or selecting a different topic</p>
    </div>
  )}

  {/* ROWS */}
  {filteredProblems.map((problem, index) => {
    const isSolved = solvedProblems.includes(problem._id);

    return (
      <div
        key={problem._id}
        onClick={() => navigate(`/problem/${problem.slug}`)}
        className={`grid grid-cols-12 px-5 py-4 cursor-pointer transition-all duration-200
        ${index % 2 === 0 ? "bg-[#141414]" : "bg-[#181818]"}
        hover:bg-[#222222] hover:scale-[1.01]`}
      >

        {/* STATUS */}
        <div className="col-span-1 flex items-center">
          {isSolved ? (
            <div className="w-5 h-5 flex items-center justify-center rounded-full bg-green-500/20">
              <span className="text-green-400 text-xs">✔</span>
            </div>
          ) : (
            <div className="w-5 h-5 border border-gray-600 rounded-full"></div>
          )}
        </div>

        {/* TITLE */}
        <div className="col-span-7 flex items-center font-medium">
          {problem.title}
        </div>

        {/* DIFFICULTY */}
        <div className="col-span-4 flex justify-end items-center">
          <DifficultyBadge difficulty={problem.difficulty} />
        </div>

      </div>
    );
  })}

</div>
    </div>
  );
}


function DifficultyBadge({ difficulty }) {
  const styles = {
    Easy: "bg-green-500/20 text-green-400 border-green-500/30",
    Medium: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
    Hard: "bg-red-500/20 text-red-400 border-red-500/30",
  };

  return (
    <span
      className={`px-3 py-1 text-xs rounded-full border ${
        styles[difficulty] || "bg-gray-500/20 text-gray-400 border-gray-500/30"
      }`}
    >
      {difficulty}
    </span>
  );
}