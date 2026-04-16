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
    <div className="relative w-64">
      {/* Search Input */}
      <div className="flex items-center bg-[#2a2a2a] px-3 py-1 rounded-lg">
        <FiSearch className="text-gray-400 mr-2" />
        <input
          type="text"
          value={query}
          onChange={handleChange}
          placeholder="Search problems..."
          className="bg-transparent outline-none text-sm w-full text-white"
        />
      </div>

      {/* 🔥 Dropdown Results */}
    {results.length > 0 && (
  <div className="absolute top-12 w-full bg-[#1f1f1f] rounded-xl shadow-xl mt-2 z-50 border border-gray-700 overflow-hidden">

    {results.map((item) => (
      <div
        key={item._id}
        onClick={() => handleSelect(item)}
        className="px-4 py-3 cursor-pointer hover:bg-[#2a2a2a] transition border-b border-gray-700 last:border-none"
      >
        <p className="text-sm font-medium text-white">
          {item.title}
        </p>

        {/* Optional: difficulty / tags */}
        <div className="flex items-center gap-2 mt-1 text-xs text-gray-400">
          {item.difficulty && (
            <span className="px-2 py-[2px] bg-gray-700 rounded">
              {item.difficulty}
            </span>
          )}

          {item.tags?.slice(0, 2).map((tag, i) => (
            <span key={i} className="px-2 py-[2px] bg-gray-700 rounded">
              {tag}
            </span>
          ))}
        </div>
      </div>
    ))}

  </div>
)}
    </div>
  );
}