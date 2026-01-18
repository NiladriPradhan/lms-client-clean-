import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { useGetAllCourseQuery } from "@/features/api/courseApi";
import { useTheme } from "@/context/useTheme";

export default function CourseTable() {
  const navigate = useNavigate();
  const { theme } = useTheme();
  const themeClasses =
    theme === "light"
      ? "bg-white text-black"
      : theme === "dark"
        ? "bg-gray-900 text-white"
        : "bg-gray-950 text-white";

  const { data, isLoading } = useGetAllCourseQuery();
  console.log("table data", data);

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="w-full space-y-4">
      {/* Action bar */}
      <div className="flex justify-start">
        <Button onClick={() => navigate("create")}>Create a new courses</Button>
      </div>

      {/* Table wrapper */}
      <div className="w-full overflow-x-auto">
        <Table className={`w-full ${themeClasses}`}>
          <TableCaption>A list of your recent courses.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className={`${themeClasses}`}>Title</TableHead>
              <TableHead className={`${themeClasses}`}>Price</TableHead>
              <TableHead className={`${themeClasses}`}>Status</TableHead>
              <TableHead className={`${themeClasses} text-right`}>
                Action
              </TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {data?.courses?.map((course) => (
              <TableRow key={course._id}>
                <TableCell>{course.courseTitle}</TableCell>
                <TableCell>{course.coursePrice ?? "-"}</TableCell>
                <TableCell>
                  {course.isPublished ? "Published" : "Unpublished"}
                </TableCell>
                <TableCell className={`${themeClasses} text-right`}>
                  <Link to={`/admin/course/${course._id}`}>
                    <Button
                      variant="outline"
                      className={`${
                        theme === "dark"
                          ? "bg-white text-gray-600"
                          : theme === "light"
                            ? "bg-white text-gray-600"
                            : "bg-white text-gray-600"
                      }`}
                    >
                      Edit
                    </Button>
                  </Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
