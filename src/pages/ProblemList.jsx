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

  const filteredProblems = problems.filter((p) => {
    return (
      p.topic === topicId &&
      (filter === "All" || p.difficulty === filter)
    );
  });

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

      {/* Table */}
      <div className="bg-[#1e1e1e] rounded-lg overflow-hidden border border-gray-800">

        {/* Header */}
        <div className="grid grid-cols-12 px-4 py-3 text-gray-400 text-sm border-b border-gray-800">
          <div className="col-span-1">✔</div>
          <div className="col-span-7">Title</div>
          <div className="col-span-4">Difficulty</div>
        </div>

        {/* Rows */}
        {filteredProblems.map((problem, index) => {
          const isSolved = solvedProblems.includes(problem._id); // 🔥 backend uses _id

          return (
            <div
              key={problem._id}
              onClick={() => navigate(`/problem/${problem.slug}`)} // 🔥 use slug
              className={`grid grid-cols-12 px-4 py-3 cursor-pointer transition 
              ${index % 2 === 0 ? "bg-[#1a1a1a]" : "bg-[#202020]"}
              hover:bg-[#2a2a2a]`}
            >
              {/* Status */}
              <div className="col-span-1">
                {isSolved && <span className="text-green-400">✔</span>}
              </div>

              {/* Title */}
              <div className="col-span-7">{problem.title}</div>

              {/* Difficulty */}
              <div className={`col-span-4 ${difficultyColor(problem.difficulty)}`}>
                {problem.difficulty}
              </div>
            </div>
          );
        })}

      </div>
    </div>
  );
}