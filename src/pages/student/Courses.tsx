import { CourseCard } from "@/components/CourseCard";
import MyLearningSkeleton from "@/components/MyLearningSkeleton";
import { useTheme } from "@/context/useTheme";
import { useGetPublishedCourseQuery } from "@/features/api/courseApi";
import { useEffect } from "react";
import { toast } from "sonner";

export const Courses = () => {
  const { theme } = useTheme();

  const { data, isSuccess, isLoading } = useGetPublishedCourseQuery();
  console.log(data);

  useEffect(() => {
    if (isSuccess) {
      toast.success("Courses loaded successfully");
    }
  }, [isSuccess]);
  const themeClasses =
    theme === "light"
      ? "bg-white text-black"
      : theme === "dark"
        ? "bg-gray-900 text-white"
        : "bg-gray-950 text-white";
  return (
    <div className="p-4">
      <div
        className={` ${themeClasses} grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 place-items-center mx-auto justify-center max-w-6xl`}
      >
        {isLoading
          ? Array.from({ length: 8 }).map((_, i) => (
              <MyLearningSkeleton key={i} />
            ))
          : data?.courses?.map((course, i) => (
              <CourseCard key={i} course={course} />
            ))}
      </div>
    </div>
  );
};
