import  {courses}  from "../data/courses";
import { useNavigate } from "react-router-dom";

export default function Courses() {
  const navigate = useNavigate();

  return (
    <div className="bg-[#0f0f0f] text-white  p-6 pt-20">

      <h1 className="text-2xl font-bold mb-6">Courses</h1>

      <div className="grid md:grid-cols-3 gap-6">
        {courses.map((course) => (
          <div
            key={course.id}
            onClick={() => navigate(`/course/${course.id}`)}
            className="bg-[#1e1e1e] p-5 rounded-xl border border-gray-800 cursor-pointer hover:border-yellow-400 transition"
          >
            <h2 className="text-lg font-semibold">{course.title}</h2>
            <p className="text-gray-400 text-sm mt-2">
              {course.description}
            </p>

            {course.premium && (
              <span className="text-xs text-yellow-400 mt-2 inline-block">
                👑 Premium
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}