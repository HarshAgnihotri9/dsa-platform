import { useParams } from "react-router-dom";
import { courses } from "../data/courses";

export default function CourseDetail() {
  const { courseId } = useParams();
  const course = courses.find((c) => c.id === courseId);

  if (!course) return <p className="text-white p-6">Course not found</p>;

  return (
    <div className="bg-[#1a1a1a] text-white min-h-screen p-6">

      <h1 className="text-2xl font-bold mb-4">{course.title}</h1>

      <p className="text-gray-400 mb-6">{course.description}</p>

      <div className="space-y-4">
        {course.lessons.map((lesson, i) => (
          <div key={i} className="bg-[#1e1e1e] p-4 rounded border border-gray-800">
            <h3 className="mb-2">{lesson.title}</h3>

            <iframe
              width="100%"
              height="200"
              src={lesson.video}
              title="video"
              className="rounded"
              allowFullScreen
            />
          </div>
        ))}
      </div>
    </div>
  );
}