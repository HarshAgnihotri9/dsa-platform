import { topics } from "../data/topics";
import TopicCard from "../components/TopicCard";

export default function Topics() {
  return (
    <div className="bg-[#0f0f0f] text-white min-h-screen">

      {/* HERO HEADER */}
      <div className="max-w-6xl mx-auto px-6 pt-16 pb-10 text-center">

        <h1 className="text-4xl md:text-5xl font-bold leading-tight">
          Explore <span className="bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">DSA Topics</span>
        </h1>

        <p className="text-gray-400 mt-4 max-w-2xl mx-auto">
          Master data structures and algorithms step-by-step with structured problems and guided thinking.
        </p>
      </div>

      {/* GRID */}
      <div className="max-w-6xl mx-auto px-6 pb-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">

          {topics.map((topic) => (
            <TopicCard key={topic.id} topic={topic} />
          ))}

        </div>
      </div>

    </div>
  );
}