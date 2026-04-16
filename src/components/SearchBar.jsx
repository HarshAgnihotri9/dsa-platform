import { useState, useMemo, useEffect } from "react";
import { FiSearch } from "react-icons/fi";
import { getProblems } from "../api/problemApi";
import { useNavigate } from "react-router-dom";
export default function SearchBar() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [allProblems, setAllProblems] = useState([]);
const navigate = useNavigate();
  // 🔥 Load all problems once
  useEffect(() => {
    const loadProblems = async () => {
      try {
        const data = await getProblems();
        setAllProblems(data);
      } catch (err) {
        console.error("Error fetching problems:", err);
      }
    };

    loadProblems();
  }, []);

  // 🔥 debounce
  const debounce = (func, delay) => {
    let timer;
    return (...args) => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        func(...args);
      }, delay);
    };
  };

  // 🔥 throttle
  const throttle = (func, limit) => {
    let lastCall = 0;
    return (...args) => {
      const now = Date.now();
      if (now - lastCall >= limit) {
        lastCall = now;
        func(...args);
      }
    };
  };

  // 🔥 REAL search logic
  const fetchResults = (text) => {
    if (!text.trim()) {
      setResults([]);
      return;
    }

    const filtered = allProblems.filter((problem) =>
      problem.title.toLowerCase().includes(text.toLowerCase())
    );

    setResults(filtered.slice(0, 5)); // limit to 5 results
  };

  // 🔥 optimized function
  const optimizedSearch = useMemo(() => {
    return debounce(
      throttle((text) => {
        fetchResults(text);
      }, 1000),
      400
    );
  }, [allProblems]); // important dependency

  const handleSelect = (problem) => {
  setQuery("");
  setResults([]);

  navigate(`/problem/${problem.slug}`);
};

  // 🔥 handle input
  const handleChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    optimizedSearch(value);
  };

  return (
<div className="relative w-72">

  {/* INPUT */}
  <div className="flex items-center bg-[#1a1a1a] border border-gray-800 rounded-xl px-3 py-2 
    focus-within:border-yellow-400 focus-within:ring-1 focus-within:ring-yellow-400 transition">

    <FiSearch className="text-gray-500 mr-2 text-sm" />

    <input
      type="text"
      value={query}
      onChange={handleChange}
      placeholder="Search problems..."
      className="bg-transparent outline-none text-sm w-full text-white placeholder-gray-500"
    />
  </div>

  {/* DROPDOWN */}
  {(query || results.length > 0) && (
    <div className="absolute top-12 left-0 w-full bg-[#141414] border border-gray-800 rounded-xl shadow-2xl mt-2 z-50 overflow-hidden backdrop-blur-sm">

      {/* EMPTY STATE */}
      {results.length === 0 ? (
        <div className="p-4 text-center text-gray-500 text-sm">
          No problems found 😕
        </div>
      ) : (
        results.map((item) => (
          <div
            key={item._id}
            onClick={() => handleSelect(item)}
            className="px-4 py-3 cursor-pointer transition-all duration-200 
              hover:bg-[#1f1f1f] hover:scale-[1.01] border-b border-gray-800 last:border-none"
          >

            {/* TITLE */}
            <p className="text-sm font-medium text-white">
              {item.title}
            </p>

            {/* META */}
            <div className="flex items-center gap-2 mt-2 flex-wrap">

              {/* DIFFICULTY BADGE */}
              {item.difficulty && (
                <span className={`px-2 py-[2px] text-xs rounded-full border ${
                  item.difficulty === "Easy"
                    ? "bg-green-500/20 text-green-400 border-green-500/30"
                    : item.difficulty === "Medium"
                    ? "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
                    : "bg-red-500/20 text-red-400 border-red-500/30"
                }`}>
                  {item.difficulty}
                </span>
              )}

              {/* TAGS */}
              {item.tags?.slice(0, 2).map((tag, i) => (
                <span
                  key={i}
                  className="px-2 py-[2px] text-xs rounded-full bg-gray-800 text-gray-300 border border-gray-700"
                >
                  {tag}
                </span>
              ))}

            </div>

          </div>
        ))
      )}

    </div>
  )}
</div>
  );
}