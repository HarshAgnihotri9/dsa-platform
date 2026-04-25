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
    <section className="py-24 px-6 bg-gradient-to-b from-black via-zinc-950 to-black text-white relative overflow-hidden">
      
      {/* Background Glow */}
      <div className="absolute top-[-100px] left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-yellow-500/10 blur-3xl rounded-full"></div>

      <div className="max-w-6xl mx-auto text-center relative z-10">
        
        {/* Heading */}
        <h2 className="text-3xl md:text-5xl font-bold mb-4 tracking-tight">
          Why This Platform?
        </h2>

        <p className="text-gray-400 mb-14 text-lg">
          Built for developers who want <span className="text-yellow-400">results</span>, not just theory.
        </p>

        {/* Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((item, index) => (
            <motion.div
              key={index}
              whileHover={{ y: -8, scale: 1.03 }}
              transition={{ type: "spring", stiffness: 200 }}
              className="group relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 text-left hover:border-yellow-500/50 transition duration-300"
            >
              {/* Glow Border */}
              <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition duration-300 bg-gradient-to-r from-yellow-500/10 to-transparent blur-xl"></div>

              {/* Icon */}
              <div className="mb-4 w-12 h-12 flex items-center justify-center rounded-xl bg-yellow-500/10 text-yellow-400">
                {item.icon}
              </div>

              {/* Title */}
              <h3 className="text-lg font-semibold mb-2 group-hover:text-yellow-400 transition">
                {item.title}
              </h3>

              {/* Desc */}
              <p className="text-gray-400 text-sm leading-relaxed">
                {item.desc}
              </p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}