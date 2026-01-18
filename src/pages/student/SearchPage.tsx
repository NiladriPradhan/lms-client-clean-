import { SkeletonComp } from "@/components/SkeletonComp";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { useGetSearchCourseQuery } from "@/features/api/courseApi";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";
export type Course = {
  _id: string;
  courseTitle: string;
  description: string;
  courseThumbnail?: string;
  courseLevel: "Beginner" | "Intermediate" | "Advanced";
  coursePrice: number;
  creator?: {
    _id: string;
    name: string;
    photoUrl?: string;
  };
};

const categories = [
  { id: "nextjs", label: "Next.js" },
  { id: "React.js", label: "React.js" },
  { id: "Data science", label: "Data science" },
  { id: "Python", label: "Python" },
  { id: "Javascript", label: "Javascript" },
  { id: "Frontend Developer", label: "Frontend Developer" },
  { id: "Backend Developer", label: "Backend Developer" },
  { id: "Mern Stack Developmnt", label: "Mern Stack Developmnt" },
  { id: "Docker", label: "Docker" },
  { id: "MongoDB", label: "MongoDB" },
  { id: "HTML", label: "HTML" },
];
type SortType = "highTolow" | "lowTohigh" | "";
export default function SearchPage() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("query") ?? "";
  const [selectedCategory, setSelectedCategory] = useState<string[]>([]);
  const [sortByPrice, setSortByPrice] = useState<SortType>("");

  const { data, isLoading } = useGetSearchCourseQuery({
    query: query,
    categories: selectedCategory,
    sortByPrice,
  });
  const isEmpty =
    !isLoading &&
    (!data || data.success === false || data?.courses.length === 0);

  const handleCategoryChange = (categoryId: string) => {
    setSelectedCategory((prev) =>
      prev.includes(categoryId)
        ? prev.filter((id) => id !== categoryId)
        : [...prev, categoryId],
    );
  };

  const handleSorted = (selectValue: SortType) => {
    setSortByPrice(selectValue);
  };

  return (
    <>
      <h2 className="mt-8 ml-14 italic text-blue-700">
        Showing results for{" "}
        <span className="text-lg font-semibold"> "{query}"</span>
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-12 max-w-7xl mx-auto p-5 gap-2">
        <div className="md:col-span-3">
          <Card className="w-full max-w-sm p-4">
            <div className="flex items-center space-x-2 justify-between">
              <h2>Filter Options</h2>
              <Select onValueChange={(value: SortType) => handleSorted(value)}>
                <SelectTrigger className="w-37.5">
                  <SelectValue placeholder="sort" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Sort</SelectLabel>
                    <SelectItem value="highTolow">Hight to Low</SelectItem>
                    <SelectItem value="lowTohigh"> Low to High </SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <Separator className="" />
            <ul className="space-y-2">
              <h2 className="font-semibold uppercase">Category</h2>
              {categories?.map((elem) => (
                <div className="flex items-center space-x-2" key={elem.id}>
                  {/* <input type="checkbox" /> */}
                  <Checkbox
                    checked={selectedCategory.includes(elem.label)}
                    onCheckedChange={() => handleCategoryChange(elem.label)}
                  />

                  <Label htmlFor="terms">{elem.label}</Label>
                </div>
              ))}
            </ul>
          </Card>
        </div>
        <div className="md:col-span-9 space-y-2">
          {isLoading ? (
            [1, 2, 3].map((_) => <SkeletonComp />)
          ) : isEmpty ? (
            <h2 className="text-2xl font-semibold">No course found</h2>
          ) : (
            data?.courses.map((course) => (
              <Card className="px-4" key={course._id}>
                <div className="flex gap-x-2 items-center justify-between">
                  <div className="flex gap-x-2">
                    <img
                      src={
                        course.courseThumbnail ??
                        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRB0_ijMX_4xf0rGse2D334wtm-LcqQ_lrsFQ&s"
                      }
                      alt={course.courseTitle}
                      className="w-72"
                    />

                    <div className="pr-4 space-y-2">
                      <h2 className="text-xl font-semibold">
                        {course.courseTitle}
                      </h2>

                      <p>{course.description.replace(/<[^>]*>/g, "")}</p>

                      <p>Instructor: {course.creator?.name ?? "Unknown"}</p>

                      <Badge>{course.courseLevel}</Badge>
                    </div>
                  </div>

                  <span className="font-semibold">₹{course.coursePrice}</span>
                </div>
              </Card>
            ))
          )}
        </div>
      </div>
    </>
  );
}
