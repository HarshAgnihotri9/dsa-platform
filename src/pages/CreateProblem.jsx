import { useState } from "react";
import Editor from "@monaco-editor/react";
import BASE_URL from '../api/problemApi'


export default function CreateProblem() {
  const [form, setForm] = useState({
    title: "",
    topic: "",
    difficulty: "Easy",
    description: "",
    hints: [""],
    starterCode: "",
    testCases: [
      { input: "", expectedOutput: "", isHidden: false },
    ],
  });

  const [loading, setLoading] = useState(false);

  // ---------- HANDLERS ----------

  const updateField = (field, value) => {
    setForm({ ...form, [field]: value });
  };

  const updateHint = (index, value) => {
    const updated = [...form.hints];
    updated[index] = value;
    setForm({ ...form, hints: updated });
  };

  const addHint = () => {
    setForm({ ...form, hints: [...form.hints, ""] });
  };

  const removeHint = (index) => {
    const updated = form.hints.filter((_, i) => i !== index);
    setForm({ ...form, hints: updated });
  };

  const updateTestCase = (index, field, value) => {
    const updated = [...form.testCases];
    updated[index][field] = value;
    setForm({ ...form, testCases: updated });
  };

  const addTestCase = () => {
    setForm({
      ...form,
      testCases: [
        ...form.testCases,
        { input: "", expectedOutput: "", isHidden: false },
      ],
    });
  };

  const removeTestCase = (index) => {
    const updated = form.testCases.filter((_, i) => i !== index);
    setForm({ ...form, testCases: updated });
  };

  // ---------- SUBMIT ----------

  const submitProblem = async () => {
    if (!form.title || !form.topic || !form.description) {
      alert("Please fill required fields ❗");
      return;
    }

    try {
      setLoading(true);

      const body = {
        ...form,
        starterCode: {
          javascript: form.starterCode,
        },
      };

      const res = await fetch(`${BASE_URL}/api/problems`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      const data = await res.json();

      alert("Problem Created ✅");
      console.log(data);

    } catch (err) {
      alert("Error creating problem ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-black min-h-screen text-white p-6 max-w-4xl mx-auto ">

      <h1 className="text-3xl font-bold mb-6">Create Problem 🚀</h1>

      {/* BASIC INFO */}
      <div className="grid md:grid-cols-2 gap-4 mb-6">

        <input
          placeholder="Title"
          className="p-3 bg-[#1f1f1f] rounded"
          onChange={(e) => updateField("title", e.target.value)}
        />

        <input
          placeholder="Topic (arrays, dp...)"
          className="p-3 bg-[#1f1f1f] rounded"
          onChange={(e) => updateField("topic", e.target.value)}
        />

        <select
          className="p-3 bg-[#1f1f1f] rounded"
          onChange={(e) => updateField("difficulty", e.target.value)}
        >
          <option>Easy</option>
          <option>Medium</option>
          <option>Hard</option>
        </select>
      </div>

      {/* DESCRIPTION */}
      <textarea
        placeholder="Problem Description"
        className="w-full p-3 bg-[#1f1f1f] rounded mb-6"
        rows={5}
        onChange={(e) => updateField("description", e.target.value)}
      />

      {/* HINTS */}
      <div className="mb-6">
        <h2 className="font-semibold mb-2">Hints</h2>

        {form.hints.map((hint, i) => (
          <div key={i} className="flex gap-2 mb-2">
            <input
              className="flex-1 p-2 bg-[#1f1f1f] rounded"
              value={hint}
              onChange={(e) => updateHint(i, e.target.value)}
            />
            <button
              onClick={() => removeHint(i)}
              className="text-red-400"
            >
              ✕
            </button>
          </div>
        ))}

        <button
          onClick={addHint}
          className="text-blue-400 text-sm"
        >
          + Add Hint
        </button>
      </div>

      {/* CODE EDITOR */}
      <div className="mb-6">
        <h2 className="font-semibold mb-2">Starter Code</h2>

        <div className="h-[250px] border border-gray-800 rounded overflow-hidden">
          <Editor
            height="100%"
            defaultLanguage="javascript"
            theme="vs-dark"
            value={form.starterCode}
            onChange={(value) => updateField("starterCode", value)}
          />
        </div>
      </div>

      {/* TEST CASES */}
      <div className="mb-6">
        <h2 className="font-semibold mb-3">Test Cases</h2>

        {form.testCases.map((tc, i) => (
          <div key={i} className="bg-[#1f1f1f] p-3 rounded mb-3">

            <input
              placeholder='Input JSON {"nums":[...]}'
              className="w-full p-2 mb-2 bg-black rounded"
              value={tc.input}
              onChange={(e) =>
                updateTestCase(i, "input", e.target.value)
              }
            />

            <input
              placeholder='Expected Output [0,1]'
              className="w-full p-2 mb-2 bg-black rounded"
              value={tc.expectedOutput}
              onChange={(e) =>
                updateTestCase(i, "expectedOutput", e.target.value)
              }
            />

            <div className="flex justify-between items-center">
              <label className="text-sm">
                <input
                  type="checkbox"
                  checked={tc.isHidden}
                  onChange={(e) =>
                    updateTestCase(i, "isHidden", e.target.checked)
                  }
                />{" "}
                Hidden
              </label>

              <button
                onClick={() => removeTestCase(i)}
                className="text-red-400 text-sm"
              >
                Remove
              </button>
            </div>

          </div>
        ))}

        <button
          onClick={addTestCase}
          className="bg-blue-600 px-3 py-1 rounded text-sm"
        >
          + Add Test Case
        </button>
      </div>

      {/* SUBMIT */}
      <button
        onClick={submitProblem}
        disabled={loading}
        className="w-full bg-green-500 text-black font-semibold py-3 rounded hover:bg-green-400 transition"
      >
        {loading ? "Creating..." : "Create Problem 🚀"}
      </button>

    </div>
  );
}