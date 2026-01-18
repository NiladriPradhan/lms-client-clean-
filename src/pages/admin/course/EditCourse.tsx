import RichTextEditor from "@/components/RichTextEditor";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
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
import {
  useEditCourseMutation,
  useGetCourseByIdQuery,
  usePublishCourseMutation,
} from "@/features/api/courseApi";
import type { InputData } from "@/types/auth.types";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";

type TCategoryData = string[];

const categoryData: TCategoryData = [
  "react.js",
  "next.js",
  "data science",
  "python",
  "javascript",
];
const courseLevel = ["beginner", "medium", "advanced"];
export default function EditCourse() {
  const navigate = useNavigate();
  const courseId = useParams().courseId;
  const [input, setInput] = useState<InputData>({
    courseTitle: "",
    subTitle: "",
    description: "",
    category: "",
    courseLevel: "",
    coursePrice: "",
    courseThumbnail: null,
  });
  const [previewThumbnail, setPreviewThumbnail] = useState("");
  const [publishCourse, { isLoading: publishLoading }] =
    usePublishCourseMutation();

  const [editCourse, { data, isLoading, isSuccess, error }] =
    useEditCourseMutation();
  const { data: courseById, isLoading: courseByIdLoading } =
    useGetCourseByIdQuery(courseId, { skip: !courseId });
  const course = courseById?.course;
  useEffect(() => {
    if (!course) return;
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setInput({
      courseTitle: course.courseTitle ?? "",
      subTitle: course.subTitle ?? "",
      description: course.description ?? "",
      category: course.category ?? "",
      courseLevel: course.courseLevel ?? "",
      coursePrice: course.coursePrice ?? "",
      courseThumbnail: null,
    });
    if (course.courseThumbnail) {
      setPreviewThumbnail(course.courseThumbnail);
    }
  }, [course, courseId]);

  const changeEventHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInput((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleThumbnail = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setInput((prev) => ({
        ...prev,
        courseThumbnail: file,
      }));
      const fileReader = new FileReader();
      fileReader.onloadend = () => {
        setPreviewThumbnail(fileReader.result as string);
      };
      fileReader.readAsDataURL(file);
    }
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("courseTitle", input.courseTitle);
    formData.append("subTitle", input.subTitle);
    formData.append("description", input.description);
    formData.append("category", input.category);
    formData.append("courseLevel", input.courseLevel);
    formData.append("coursePrice", input.coursePrice);
    if (input.courseThumbnail) {
      formData.append("courseThumbnail", input.courseThumbnail);
    }

    await editCourse({ formData, courseId }).unwrap();
  };

  const publishStatusHandler = async (publish: "true" | "false") => {
    try {
      const res = await publishCourse({
        courseId,
        publish,
      }).unwrap();

      toast.success(res.message);
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("Failed to update publish status");
      }
    }
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success(data?.message ?? "Course updated successfully");
      navigate("/admin/courses");
    }
    if (error && "data" in error) {
      const errMsg =
        typeof error.data === "object" &&
        error.data !== null &&
        "message" in error.data
          ? (error.data as { message: string }).message
          : "Failed to course update";

      toast.error(errMsg);
    }
  }, [isSuccess, data, error, navigate]);
  if (courseByIdLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="h-6 w-6 animate-spin" />
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between">
        <div />
        <Link to={`/admin/course/${courseById?.course._id}/lecture`}>
          go to lecture page
        </Link>
      </div>
      <Card className="w-full max-w-full p-4">
        <CardHeader className="flex justify-between items-center">
          <div className="flex flex-col">
            <h1 className="text-lg font-bold">Basic Information</h1>
            <p>Make changes to your course here. Click save when you're done</p>
          </div>
          <div className="flex gap-x-2">
            <Button
              disabled={publishLoading}
              onClick={() =>
                publishStatusHandler(
                  courseById?.course?.isPublished ? "false" : "true",
                )
              }
            >
              {publishLoading
                ? "Updating..."
                : courseById?.course?.isPublished
                  ? "Unpublish"
                  : "Publish"}
            </Button>

            <Button variant={"default"}>Remove Course</Button>
          </div>
        </CardHeader>
        <CardContent>
          <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
            <Label>Title</Label>
            <Input
              type="text"
              placeholder="title"
              required
              name="courseTitle"
              value={input.courseTitle}
              onChange={changeEventHandler}
            />
            <div className="grid gap-2">
              <Label>Subtitle</Label>
              <Input
                type="text"
                name="subTitle"
                placeholder="Enter subtitle"
                required
                value={input.subTitle}
                onChange={changeEventHandler}
              />
            </div>
            <div className="grid gap-2">
              <Label>Description</Label>

              <RichTextEditor input={input} setInput={setInput} />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {/* Category */}
              <div className="w-full">
                <Label>Category</Label>
                <Select
                  key={input.category}
                  value={input.category}
                  onValueChange={(value) => {
                    setInput((prev) => ({ ...prev, category: value }));
                  }}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select Category" />
                  </SelectTrigger>
                  <SelectContent className="w-full">
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

              {/* Course Level */}
              <div className="w-full">
                <Label>Course Level</Label>
                <Select
                  key={input.courseLevel}
                  value={input.courseLevel}
                  onValueChange={(value) => {
                    setInput((prev) => ({
                      ...prev,
                      courseLevel: value,
                    }));
                  }}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select Course Level" />
                  </SelectTrigger>
                  <SelectContent className="w-full">
                    <SelectGroup>
                      <SelectLabel>Course Level</SelectLabel>
                      {courseLevel.map((elem, i) => (
                        <SelectItem key={i} value={elem.toLowerCase()}>
                          {elem}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>

              {/* Price */}
              <div className="w-full">
                <Label>Price in INR</Label>
                <Input
                  type="number"
                  name="coursePrice"
                  placeholder="e.g: ₹199"
                  className="w-full"
                  value={input.coursePrice}
                  onChange={changeEventHandler}
                />
              </div>
            </div>
            {/* Course Thumbnail */}
            <div className="w-full">
              <Label>Thumbnail</Label>
              <Input
                type="file"
                accept="image/*"
                className="w-full"
                onChange={handleThumbnail}
              />
            </div>
            {previewThumbnail && (
              <img
                src={previewThumbnail}
                alt="Course Thumbnail"
                className="h-52 w-80 object-cover rounded-md my-2"
              />
            )}
            <div className="flex gap-x-2">
              <Button
                variant={"outline"}
                onClick={() => navigate("/admin/courses")}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? (
                  <span className="flex items-center gap-x-2">
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Saving...
                  </span>
                ) : (
                  "Save Changes"
                )}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

// const getErrorMessage = (error: unknown) => {
//   if (error instanceof Error) return error.message;
//   return "Something went wrong";
// }
