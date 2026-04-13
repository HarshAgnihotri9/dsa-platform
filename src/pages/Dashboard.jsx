import { getSolvedProblems } from "../utils/storage";
import { problems } from "../data/problems";
import { topics } from "../data/topics";

export default function Dashboard() {
  const solved = getSolvedProblems();

  const total = problems.length;
  const solvedCount = solved.length;
  const percentage = Math.round((solvedCount / total) * 100);

  return (
    <div className="bg-[#0b0b0b] text-white min-h-screen px-6 py-10">

      {/* HEADER */}
      <div className="mb-10">
        <h1 className="text-4xl font-bold">
          Dashboard
        </h1>
        <p className="text-gray-400 mt-2">
          Track your DSA journey and improve daily 🚀
        </p>
      </div>

      {/* 🔥 STATS CARDS */}
      <div className="grid md:grid-cols-3 gap-6 mb-10">

        {/* Solved */}
        <div className="bg-[#141414] border border-gray-800 rounded-xl p-6 hover:border-yellow-400 transition">
          <p className="text-gray-400 text-sm">Solved</p>
          <h2 className="text-3xl font-bold mt-2 text-yellow-400">
            {solvedCount}
          </h2>
        </div>

        {/* Total */}
        <div className="bg-[#141414] border border-gray-800 rounded-xl p-6 hover:border-yellow-400 transition">
          <p className="text-gray-400 text-sm">Total Problems</p>
          <h2 className="text-3xl font-bold mt-2">
            {total}
          </h2>
        </div>

        {/* Accuracy */}
        <div className="bg-[#141414] border border-gray-800 rounded-xl p-6 hover:border-yellow-400 transition">
          <p className="text-gray-400 text-sm">Progress</p>
          <h2 className="text-3xl font-bold mt-2 text-green-400">
            {percentage}%
          </h2>
        </div>
      </div>

      {/* 🔥 BIG PROGRESS BAR */}
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

      {/* 🔥 TOPIC SECTION */}
      <div>
        <h2 className="text-2xl font-semibold mb-6">
          Topic Breakdown
        </h2>

        <div className="grid md:grid-cols-2 gap-6">

          {topics.map((topic) => {
            const topicProblems = problems.filter(
              (p) => p.topic === topic.id
            );

            const solvedInTopic = topicProblems.filter((p) =>
              solved.includes(p.id)
            );

            const percent =
              topicProblems.length === 0
                ? 0
                : Math.round(
                    (solvedInTopic.length / topicProblems.length) * 100
                  );

            return (
              <div
                key={topic.id}
                className="relative bg-[#141414] rounded-xl p-5 border border-gray-800 hover:border-yellow-400 transition group overflow-hidden"
              >
                {/* Glow */}
                <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/10 to-transparent opacity-0 group-hover:opacity-100 transition"></div>

                <div className="relative z-10">

                  <div className="flex justify-between mb-2">
                    <h3 className="font-medium">{topic.name}</h3>
                    <span className="text-sm text-yellow-400">
                      {percent}%
                    </span>
                  </div>

                  <div className="w-full bg-gray-800 h-2 rounded-full">
                    <div
                      className="bg-yellow-400 h-2 rounded-full"
                      style={{ width: `${percent}%` }}
                    ></div>
                  </div>

                  <p className="text-xs text-gray-400 mt-2">
                    {solvedInTopic.length} / {topicProblems.length} solved
                  </p>

                </div>
              </div>
            );
          })}

        </div>
      </div>
    </div>
  );
}