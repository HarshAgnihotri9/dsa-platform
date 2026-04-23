import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function TopicCard({ topic }) {
  return (
    <Link to={`/topics/${topic.id}`}>
      <motion.div
        whileHover={{ y: -6, scale: 1.02 }}
        transition={{ duration: 0.25 }}
        className="relative rounded-2xl p-[1px] bg-gradient-to-br from-yellow-400/30 via-transparent to-yellow-400/20 group"
      >
        <div className="relative bg-[#111] backdrop-blur-xl rounded-2xl p-6 border border-white/5 overflow-hidden">

          {/* Glow effect */}
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-300 bg-gradient-to-br from-yellow-400/10 via-transparent to-transparent"></div>

          {/* Content */}
          <div className="relative z-10">

            {/* Header */}
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 flex items-center justify-center rounded-xl bg-yellow-400/10 text-yellow-400 text-lg">
                📚
              </div>
              <h2 className="text-lg font-semibold tracking-wide">
                {topic.name}
              </h2>
            </div>

            {/* Description */}
            <p className="text-gray-400 text-sm leading-relaxed">
              Master concepts with curated problems and real-world patterns.
            </p>

            {/* Stats (important for your platform) */}
            <div className="flex gap-4 mt-4 text-xs text-gray-500">
              <span>🔥 {topic.problems || 20}+ Problems</span>
              <span>⚡ {topic.level || "Beginner"}</span>
            </div>

            {/* Footer */}
            <div className="mt-6 flex justify-between items-center">
              <span className="text-yellow-400 text-sm font-medium flex items-center gap-1 group-hover:gap-2 transition-all">
                Start Solving
                <span>→</span>
              </span>

              <div className="w-9 h-9 rounded-full bg-yellow-400/10 flex items-center justify-center text-yellow-400 group-hover:bg-yellow-400 group-hover:text-black transition">
                →
              </div>
            </div>

          </div>
        </div>
      </motion.div>
    </Link>
  );
}