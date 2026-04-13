import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { getProblemBySlug } from "../api/problemApi";
import { runCodeApi } from "../api/submissionApi";
import { markProblemSolved } from "../utils/storage";
import Editor from "@monaco-editor/react";

export default function ProblemDetail() {
  const { problemId } = useParams();

  const [problem, setProblem] = useState(null);
  const [loading, setLoading] = useState(true);

  const [activeTest, setActiveTest] = useState(0);
  const [result, setResult] = useState(null);
  const [visibleHints, setVisibleHints] = useState(1);
  const [userCode, setUserCode] = useState("// Write your code here\n");
  // const [output, setOutput] = useState("");
  const [results, setResults] = useState([]);
const [error, setError] = useState("");
  // 🔥 FETCH PROBLEM FROM BACKEND
  useEffect(() => {
    getProblemBySlug(problemId).then((data) => {
      setProblem(data);
      setLoading(false);
    });
  }, [problemId]);

  if (loading) {
    return <p className="text-white p-6">Loading...</p>;
  }

  if (!problem) {
    return <p className="text-white p-6">Problem not found</p>;
  }

  // 🔥 RUN CODE USING BACKEND
const runCode = async () => {
  try {
    
    const data = await runCodeApi({
      slug: problem.slug,
      code: userCode,
    });
    console.log(data);
    
    // console.log(data);
    

  if (!data.success) {
  setResults(data.results || []); // 🔥 KEEP RESULTS
  setResult("fail");
  setError(data.message || "");
  return;
}
    setResults(data.results || []);
    setResult(data.success ? "pass" : "fail");
    setError("");

  } catch (error) {
    setError("Something went wrong");
    setResult("fail");
  }
};

  return (
    <div className="bg-[#1a1a1a] text-white min-h-screen flex flex-col md:flex-row">

      {/* LEFT SIDE */}
      <div className="md:w-1/2 p-6 overflow-y-auto border-r border-gray-800">

        <h1 className="text-2xl font-bold mb-4">{problem.title}</h1>

        <p className="text-gray-300 mb-6">{problem.description}</p>

        {/* Hints */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-2">Hints</h2>

          {problem.hints?.slice(0, visibleHints).map((hint, i) => (
            <div key={i} className="bg-yellow-100 text-black p-2 rounded mb-2">
              {hint}
            </div>
          ))}

          {visibleHints < (problem.hints?.length || 0) && (
            <button
              onClick={() => setVisibleHints(visibleHints + 1)}
              className="mt-2 text-sm text-yellow-400"
            >
              Show next hint →
            </button>
          )}
        </div>

{/* Test Cases Preview (LEFT SIDE) */}
<div className="mb-6">
  <h2 className="text-lg font-semibold mb-3">Examples</h2>

  {(problem.testCases || []).slice(0, 2).map((test, i) => (
    <div key={i} className="bg-[#2a2a2a] p-3 rounded mb-3 border border-gray-800">

      <p className="text-xs text-gray-400 mb-1">
        Example {i + 1}
      </p>

      <p className="text-sm mb-1">
        <span className="text-gray-400">Input: </span>
        {test.input}
      </p>

      <p className="text-sm">
        <span className="text-gray-400">Output: </span>
        {test.expectedOutput}
      </p>

    </div>
  ))}
</div>

        {/* Mark solved */}
        <button
          onClick={() => markProblemSolved(problem._id)}
          className="bg-green-600 px-4 py-2 rounded"
        >
          Mark as Solved ✅
        </button>
      </div>

      {/* RIGHT SIDE */}
      <div className="md:w-1/2 flex flex-col bg-[#1e1e1e] border-l border-gray-800">

        {/* Header */}
        <div className="flex justify-between items-center px-4 py-2 border-b border-gray-800">
          <span className="text-sm text-gray-300">JavaScript</span>

          <button
            onClick={runCode}
            className="bg-green-600 px-3 py-1 rounded text-sm hover:bg-green-500 "
          >
            Run ▶
          </button>
        </div>

        {/* Editor */}
        <div className="px-3 pt-3">
          <div className="h-[300px] rounded overflow-hidden border border-gray-800">
            <Editor
              height="100%"
              defaultLanguage="javascript"
              value={userCode}
              onChange={(value) => setUserCode(value)}
              theme="vs-dark"
            />
          </div>
        </div>

        {error && (
  <div className="bg-red-900/30 border border-red-600 text-red-400 p-3 rounded text-sm mb-3">
    ❌ {error}
  </div>
)}
{result === "fail" && (
  <div className="bg-red-900/30 border border-red-600 text-red-400 p-2 rounded text-sm mb-2">
    ❌ Your code did not produce the expected output
  </div>
)}
        {/* Output */}
      {/* RESULT PANEL */}
<div className="px-3 mt-4 pb-4">

  <h3 className="text-sm text-gray-400 mb-2">Results</h3>

  <div className="bg-black p-3 rounded text-sm border border-gray-800 min-h-[120px]">

    {/* EMPTY STATE */}
    {(results || []).length === 0 && (
      <div className="text-gray-500 text-sm">
        Run your code to see results
      </div>
    )}

    {/* RESULTS LIST */}
    <div className="space-y-3 max-h-[250px] overflow-y-auto">

      {(results || []).map((res, i) => (
        <div
          key={i}
          className={`p-3 rounded border ${
            res.passed
              ? "border-green-600 bg-green-900/20"
              : "border-red-600 bg-red-900/20"
          }`}
        >

          {/* HEADER */}
          <div className="flex justify-between mb-2">
            <span className="text-xs text-gray-400">
              Case {i + 1}
            </span>

            <span className={`text-xs ${
              res.passed ? "text-green-400" : "text-red-400"
            }`}>
              {res.passed ? "✔ Passed" : "❌ Failed"}
            </span>
          </div>

          {/* INPUT */}
          <div className="text-xs mb-1">
            <span className="text-gray-400">Input: </span>
            {res.input ? JSON.stringify(res.input) : "No input"}
          </div>

          {/* EXPECTED */}
          <div className="text-xs mb-1">
            <span className="text-gray-400">Expected: </span>
            <span className="text-green-400">
              {res.expected ? JSON.stringify(res.expected) : "No expected"}
            </span>
          </div>

          {/* OUTPUT */}
          <div className="text-xs">
            <span className="text-gray-400">Output: </span>
            <span className={!res.passed ? "text-red-400" : ""}>
              {res.output !== undefined
                ? Number.isNaN(res.output)
                  ? "NaN"
                  : JSON.stringify(res.output)
                : "No output"}
            </span>
          </div>

        </div>
      ))}

    </div>
  </div>
</div>

        {/* Test Cases */}
        <div className="px-3 pb-4">
          <div className="bg-[#1e1e1e] border border-gray-800 rounded-lg p-3">

            <div className="flex justify-between items-center mb-3">
              <h3 className="text-sm font-medium text-gray-300">Test Cases</h3>

              {result && (
                <span
                  className={`text-xs px-2 py-1 rounded ${
                    result === "pass"
                      ? "bg-green-600"
                      : "bg-red-600"
                  }`}
                >
                  {result === "pass" ? "Passed" : "Failed"}
                </span>
              )}
            </div>

            <div className="flex gap-2 mb-4">
              {problem.testCases?.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActiveTest(i)}
                  className={`px-3 py-1 text-xs rounded-md ${
                    activeTest === i
                      ? "bg-yellow-400 text-black"
                      : "bg-[#2a2a2a]"
                  }`}
                >
                  Case {i + 1}
                </button>
              ))}
            </div>

            <div className="mb-3">
              <p className="text-xs text-gray-400 mb-1">Input</p>
              <div className="bg-black p-3 rounded text-sm">
                {problem.testCases?.[activeTest]?.input}
              </div>
            </div>

            <div>
              <p className="text-xs text-gray-400 mb-1">Expected Output</p>
              <div className="bg-black p-3 rounded text-sm">
                {problem.testCases?.[activeTest]?.expectedOutput}
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}