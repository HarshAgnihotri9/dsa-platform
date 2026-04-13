import { Link } from "react-router-dom";

export default function TopicCard({ topic }) {
  return (
    <Link to={`/topics/${topic.id}`}>
      <div className="relative bg-[#1a1a1a] rounded-2xl p-6 border border-gray-800 hover:border-yellow-400 transition duration-300 cursor-pointer overflow-hidden group">

        {/* Glow Effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/10 to-transparent opacity-0 group-hover:opacity-100 transition"></div>

        {/* Content */}
        <div className="relative z-10">

          {/* Title */}
          <h2 className="text-xl font-semibold mb-2">
            {topic.name}
          </h2>

          {/* Description */}
          <p className="text-gray-400 text-sm">
            Solve curated problems and build strong intuition.
          </p>

          {/* Footer */}
          <div className="mt-6 flex justify-between items-center">
            <span className="text-yellow-400 text-sm font-medium group-hover:translate-x-1 transition">
              Start →
            </span>

            <div className="w-8 h-8 rounded-full bg-yellow-400/20 flex items-center justify-center text-yellow-400">
              →
            </div>
          </div>

        </div>
      </div>
    </Link>
  );
}