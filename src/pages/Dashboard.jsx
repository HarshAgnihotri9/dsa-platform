import { useEffect, useState } from "react";
import { BASE_URL } from "../api/problemApi";

export default function Dashboard() {
  const [data, setData] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await fetch(`${BASE_URL}/dashboard`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const json = await res.json();
         if (res.status === 401) {
        localStorage.removeItem("token");
        navigate("/login");
        return;
      }

        if (!json.success) {
          setError("Failed to load dashboard");
          return;
        }

        setData(json.data);
      } catch (err) {
        console.error(err);
        setError("Something went wrong");
      }
    };

    fetchDashboard();
  }, []);

  if (!data && !error) {
    return (
      <div className="bg-[#0b0b0b] text-white min-h-screen flex items-center justify-center">
        Loading Dashboard...
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-[#0b0b0b] text-red-400 min-h-screen flex items-center justify-center">
        {error}
      </div>
    );
  }


  return (
    <div className="bg-[#0b0b0b] text-white min-h-screen p-6">

      <div className="flex flex-col md:flex-row gap-6">

        {/* ================= LEFT ================= */}
     <div className="w-full md:w-[300px] bg-[#141414] p-6 rounded-2xl border border-gray-800 shadow-lg">

  {/* PROFILE HEADER */}
  <div className="flex flex-col items-center text-center mb-6">

    {/* AVATAR */}
    <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center text-black font-bold text-xl mb-3">
      {data?.user?.name?.[0] || "U"}
    </div>

    {/* NAME */}
    <h2 className="text-lg font-semibold">
      {data?.user?.name || "User"}
    </h2>

    {/* USERNAME */}
    <p className="text-sm text-gray-400">
      @{data?.user?.username || "username"}
    </p>

  </div>

  {/* STATS GRID */}
  <div className="grid grid-cols-2 gap-4">

    <StatBox label="Streak" value={data.streak} color="text-orange-400" icon="🔥" />
    <StatBox label="Points" value={data.points} color="text-yellow-400" icon="🏆" />
    <StatBox label="Rank" value={`#${data.rank}`} color="text-blue-400" icon="🏅" />
    <StatBox label="Solved" value={data.solvedProblems} color="text-green-400" icon="✅" />

  </div>

</div>

        {/* ================= RIGHT ================= */}
        <div className="flex-1">

          {/* STATS */}
          <div className="grid md:grid-cols-4 gap-6 mb-6">

            <StatCard title="Solved" value={data.solvedProblems} color="text-yellow-400" />
            <StatCard title="Total" value={data.totalProblems} />
            <StatCard title="Progress" value={`${data.progress.percentage}%`} color="text-green-400" />

            <div className="bg-[#141414] border border-gray-800 rounded-xl p-6">
              <p className="text-gray-400 text-sm">Today</p>
              <h2 className={data.solvedToday ? "text-green-400" : "text-red-400"}>
                {data.solvedToday ? "✅ Done" : "❌ Not Solved"}
              </h2>
            </div>

          </div>

          {/* PROGRESS BAR */}
          <div className="bg-[#141414] p-6 rounded-xl border border-gray-800 mb-6">
            <div className="flex justify-between mb-4">
              <h2>Progress</h2>
              <span>{data.progress.percentage}%</span>
            </div>

            <div className="w-full bg-gray-800 h-4 rounded-full">
              <div
                className="h-4 bg-yellow-400"
                style={{ width: `${data.progress.percentage}%` }}
              />
            </div>
          </div>



          {/* RECENT */}
          <div className="bg-[#141414] p-6 rounded-xl border border-gray-800">

            <h2 className="mb-4">Recent Submissions</h2>

            {(data.recentSubmissions || []).length === 0 && (
              <p className="text-gray-400 text-sm">No submissions yet</p>
            )}

            {(data.recentSubmissions || []).map((item, i) => (
              <div key={i} className="flex justify-between bg-[#1e1e1e] p-3 rounded mb-2">
                <span className="font-medium">{item.title}</span>
                <span className="text-gray-400 text-sm">
                  {new Date(item.time).toLocaleString()}
                </span>
              </div>
            ))}

          </div>

        </div>
      </div>
    </div>
  );
}

/* CARD */
function StatCard({ title, value, color }) {
  return (
    <div className="bg-[#141414] p-6 rounded-xl border border-gray-800">
      <p className="text-gray-400">{title}</p>
      <h2 className={`text-2xl font-bold ${color || ""}`}>{value}</h2>
    </div>
  );
}

function StatBox({ label, value, color, icon }) {
  return (
    <div className="bg-[#1e1e1e] p-4 rounded-xl text-center hover:bg-[#2a2a2a] transition">
      <p className="text-xs text-gray-400 mb-1">
        {icon} {label}
      </p>
      <h3 className={`text-lg font-bold ${color}`}>
        {value || 0}
      </h3>
    </div>
  );
}