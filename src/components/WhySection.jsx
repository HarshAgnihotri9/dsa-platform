"use client";

import { motion } from "framer-motion";
import { BookOpen, Zap, Target, Smile } from "lucide-react";

const features = [
  {
    icon: <BookOpen className="w-6 h-6" />,
    title: "No Boring Theory",
    desc: "Skip long lectures. Learn by actually solving real problems.",
  },
  {
    icon: <Zap className="w-6 h-6" />,
    title: "Learn by Solving",
    desc: "Hands-on approach to build real problem-solving skills.",
  },
  {
    icon: <Smile className="w-6 h-6" />,
    title: "Beginner Friendly",
    desc: "Carefully structured problems for smooth learning curve.",
  },
  {
    icon: <Target className="w-6 h-6" />,
    title: "Interview Focused",
    desc: "Practice questions asked in real tech interviews.",
  },
];

export default function WhySection() {
  return (
    <section className="py-20 px-6 bg-black text-white">
      <div className="max-w-6xl mx-auto text-center">
        
        {/* Heading */}
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Why This Platform?
        </h2>
        <p className="text-gray-400 mb-12">
          Built for developers who want results, not just theory.
        </p>

        {/* Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((item, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05 }}
              className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 text-left hover:border-yellow-500 transition"
            >
              <div className="mb-4 text-yellow-500">
                {item.icon}
              </div>

              <h3 className="text-lg font-semibold mb-2">
                {item.title}
              </h3>

              <p className="text-gray-400 text-sm">
                {item.desc}
              </p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}