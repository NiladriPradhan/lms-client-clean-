import React from "react";
import { Play } from "lucide-react";
import { Link } from "react-router-dom";
import { useTheme } from "@/context/useTheme";

type CourseCardProps = {
  course: {
    _id: string;
    courseThumbnail?: string;
    courseTitle: string;
    courseLevel: string;
    coursePrice?: number;
    creator?: {
      photoUrl?: string;
      name: string;
    };
  };
};

export const CourseCard: React.FC<CourseCardProps> = ({ course }) => {
  const { theme } = useTheme();
  if (!theme) return null;

  return (
    <Link to={`/course-details/${course?._id}`}>
      <div
        className={`
    w-full max-w-sm overflow-hidden rounded-lg transition-all duration-300 border-0
    hover:shadow-xl hover:-translate-y-1
    ${theme === "light" ? "bg-white text-black" : "bg-gray-900 text-white"}
  `}
      >
        {/* Thumbnail */}
        <div className="relative">
          <img
            src={course?.courseThumbnail}
            alt="Course thumbnail"
            className="h-44 w-full object-cover block"
          />

          {/* Play Overlay */}
          <div className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 hover:opacity-100 transition">
            <div className="h-14 w-14 rounded-full bg-white/90 flex items-center justify-center">
              <Play className="text-black" />
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-4 space-y-4">
          {/* Title */}
          <h2 className="text-lg font-semibold line-clamp-2 -mt-2">
            {course?.courseTitle}
          </h2>

          {/* Instructor + Level */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              {/* Avatar */}
              <div className="h-8 w-8 rounded-full overflow-hidden bg-gray-300">
                <img
                  src={
                    course.creator?.photoUrl || "https://github.com/shadcn.png"
                  }
                  alt="Instructor"
                  className="h-full w-full object-cover"
                />
              </div>

              <span className="text-sm font-medium">
                {course.creator?.name || "Instructor"}
              </span>
            </div>

            {/* Badge */}
            <span className="px-2 py-1 text-xs font-semibold rounded-full bg-blue-500 text-white">
              {course?.courseLevel}
            </span>
          </div>

          {/* Price */}
          <button className="text-lg font-semibold text-blue-600">
            {course.coursePrice != null ? `₹${course.coursePrice}` : "Free"}
          </button>
        </div>
      </div>
    </Link>
  );
};
