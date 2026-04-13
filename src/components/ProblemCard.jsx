import { getSolvedProblems } from "../utils/storage";
import { Link } from "react-router-dom";

export default function ProblemCard({ problem }) {
  const solved = getSolvedProblems().includes(problem.id);

  const difficultyColor =
    problem.difficulty === "Easy"
      ? "text-green-600"
      : problem.difficulty === "Medium"
      ? "text-yellow-600"
      : "text-red-600";

  return (
    <Link to={`/problem/${problem.id}`}>
      <div className="p-5 bg-white rounded-xl shadow hover:shadow-lg transition cursor-pointer border">
        
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-semibold">{problem.title}</h2>
          {solved && <span className="text-green-600">✔</span>}
        </div>

        <p className="text-gray-500 mt-2">{problem.description}</p>

        <div className="mt-3 flex justify-between items-center">
          <span className={`text-sm font-medium ${difficultyColor}`}>
            {problem.difficulty}
          </span>
        </div>

      </div>
    </Link>
  );
}