import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
import { useCreateCourseMutation } from "@/features/api/courseApi";
import { Loader } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const categoryData = [
  "react.js",
  "next.js",
  "data science",
  "python",
  "javascript",
];

export default function AddCourse() {
  const [courseTitle, setCourseTitle] = useState("");
  const [category, setCategory] = useState("");
  const navigate = useNavigate();
  // const isLoading = true;

  const [createCourse, { data, isLoading, isSuccess }] =
    useCreateCourseMutation();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setCourseTitle(value);
  };

  const createCourseHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await createCourse({ courseTitle, category });
  };
  const getSelectCategory = (value: string) => {
    setCategory(value);
  };

  useEffect(() => {
    if (isSuccess && data) {
      toast.success(data.message ?? "Course created successfully");
      navigate("/admin/courses");
    }
  }, [data, isSuccess, navigate]);

  return (
    <>
      <div className="flex flex-col mb-4">
        <h2 className="text-2xl font-semibold">
          Let's add course, add some basic details for your new course.
        </h2>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
      </div>
      <form className="flex flex-col space-y-2" onSubmit={createCourseHandler}>
        <div className="flex flex-col space-y-2">
          <Label>Title</Label>
          <Input
            className="w-full"
            placeholder="Your Course Name"
            type="text"
            name="courseTitle"
            value={courseTitle}
            onChange={handleChange}
          />
        </div>
        <div className="flex flex-col space-y-2">
          <Label>Category</Label>
          <Select onValueChange={getSelectCategory}>
            <SelectTrigger className="w-45">
              <SelectValue placeholder="Select Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Category</SelectLabel>
                {categoryData.map((elem, i) => (
                  <SelectItem key={i} value={elem.toLowerCase()}>
                    {elem}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <div className="flex  gap-x-2">
          <Button
            type="button"
            variant={"outline"}
            onClick={() => navigate("/admin/courses")}
          >
            Cancel
          </Button>
          <Button type="submit" variant={"default"}>
            {isLoading ? (
              <>
                <div className="flex items-center">
                  <Loader className="h-6 w-6 mr-2" />
                  <span className="">Loading...</span>
                </div>
              </>
            ) : (
              "Create"
            )}
          </Button>
        </div>
      </form>
    </>
  );
}
