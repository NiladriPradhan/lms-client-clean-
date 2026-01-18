import MyLearningSkeleton from "@/components/MyLearningSkeleton";
import { useEffect, useState } from "react";
import { useLoadUserQuery } from "@/features/api/authApi";
import { CourseCard } from "@/components/CourseCard";
import { useTheme } from "@/context/useTheme";
import type { CourseWithCreator } from "@/types/lecture.type";

/* ================= TYPES ================= */

export type EnrolledCourse = {
  _id: string;
  courseTitle: string;
  courseThumbnail?: string;
  courseLevel: "Beginner" | "Intermediate" | "Advanced";
  coursePrice: number;
};
export type User = {
  _id: string;
  name: string;
  email: string;
  enrolledCourses: EnrolledCourse[];
};

export type LoadUserResponse = {
  success: boolean;
  user: User;
};

/* ================= COMPONENT ================= */

export default function MyLearning() {
  const { data, isLoading: isUserLoading } = useLoadUserQuery();

  const [showSkeleton, setShowSkeleton] = useState(true);

  const { theme } = useTheme();
  if (!theme) return null;

  const myLearning = data?.user?.enrolledCourses ?? [];

  /* ---------- Skeleton delay ---------- */
  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSkeleton(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  /* ---------- Theme styles ---------- */
  const themeClasses =
    theme === "light"
      ? "bg-white text-black"
      : theme === "dark"
        ? "bg-gray-900 text-white"
        : "bg-gray-950 text-white";

  /* ================= RENDER ================= */

  return (
    <div className={`${themeClasses} max-w-full min-h-screen w-full mx-auto`}>
      <div className="flex max-w-6xl py-4 mx-auto items-center">
        {isUserLoading || showSkeleton ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 place-items-center mx-auto">
            {Array.from({ length: 8 }).map((_, i) => (
              <MyLearningSkeleton key={i} />
            ))}
          </div>
        ) : myLearning.length === 0 ? (
          <h2 className="text-xl font-semibold text-center mx-auto">
            No Courses Found...!
          </h2>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 place-items-center mx-auto">
            {myLearning.map((course) => (
              <CourseCard
                key={course._id}
                course={course as CourseWithCreator}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
