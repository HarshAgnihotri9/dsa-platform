import { useNavigate } from "react-router-dom";
import Courses from "./Courses";
import WhySection from "../components/WhySection";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="bg-[#1a1a1a] text-white min-h-screen">

      {/* HERO SECTION */}
      <div className="max-w-6xl mx-auto px-6 py-20 text-center">

        <h1 className="text-4xl md:text-5xl font-bold leading-tight">
          Master DSA with <span className="text-yellow-400">Real Thinking</span>
        </h1>

        <p className="text-gray-400 mt-4 max-w-2xl mx-auto">
          Practice problems, learn step-by-step approaches, and improve your problem-solving skills — just like real interviews.
        </p>

        {/* Buttons */}
        <div className="mt-8 flex justify-center gap-4">
          <button
            onClick={() => navigate("/topics")}
            className="bg-yellow-400 text-black px-6 py-3 rounded-lg font-medium hover:bg-yellow-300 transition"
          >
            Start Practicing 🚀
          </button>

          <button
            onClick={() => navigate("/dashboard")}
            className="border border-gray-600 px-6 py-3 rounded-lg hover:bg-gray-800 transition"
          >
            View Progress
          </button>
        </div>
      </div>

      {/* FEATURES SECTION */}
      <div className="max-w-6xl mx-auto px-6 pb-20 grid md:grid-cols-3 gap-6">

        {/* Card 1 */}
        <div className="bg-[#1e1e1e] p-6 rounded-xl border border-gray-800 hover:border-yellow-400 transition">
          <h3 className="text-lg font-semibold mb-2">🧠 Smart Hints</h3>
          <p className="text-gray-400 text-sm">
            Learn how to think step-by-step instead of directly seeing solutions.
          </p>
        </div>

        {/* Card 2 */}
        <div className="bg-[#1e1e1e] p-6 rounded-xl border border-gray-800 hover:border-yellow-400 transition">
          <h3 className="text-lg font-semibold mb-2">💻 Code Editor</h3>
          <p className="text-gray-400 text-sm">
            Practice directly in a real coding environment with test cases.
          </p>
        </div>

        {/* Card 3 */}
        <div className="bg-[#1e1e1e] p-6 rounded-xl border border-gray-800 hover:border-yellow-400 transition">
          <h3 className="text-lg font-semibold mb-2">📊 Track Progress</h3>
          <p className="text-gray-400 text-sm">
            Monitor solved problems and improve your weak areas.
          </p>
        </div>

      </div>
<WhySection/>
      <Courses/>

      {/* FOOTER */}
      <div className="text-center text-gray-500 text-sm pb-6">
        Built for developers who want to actually understand DSA 🚀
      </div>

    </div>
  );
}