import ReactPlayer from "react-player";

import { Lock, PlayCircle } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Label } from "@/components/ui/label";
import BuyCourseButton from "@/components/BuyCourseButton";
import { useGetPurchasedCourseDetailWithStatusQuery } from "@/features/api/purchaseApi";
import { Button } from "@/components/ui/button";
import type { TLecture } from "@/types/lecture.type";
import { useEffect } from "react";
import { toast } from "sonner";
import type { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import type { SerializedError } from "@reduxjs/toolkit";

export default function CourseDetails() {
  const { courseId } = useParams();
  const navigate = useNavigate();

  const { data, isLoading, error, refetch } =
    useGetPurchasedCourseDetailWithStatusQuery(courseId!, {
      refetchOnMountOrArgChange: true,
    });

  useEffect(() => {
    const msg = getRTKErrorMessage(error);
    if (msg) toast.error(msg);
  }, [error]);

  if (!courseId) return <p>Course not found</p>;
  if (isLoading) return <p>Loading...</p>;
  if (!data) return <p>No course data</p>;

  const { course, purchased } = data;
  const firstLecture = course.lectures[0];

  const handleContinue = () => {
    if (purchased) {
      navigate(`/course-progress/${courseId}`);
    }
  };

  console.log("details", data);

  return (
    <div className="flex flex-col">
      {/* HEADER */}
      <div className="bg-neutral-900 text-white">
        <div className="max-w-6xl mx-auto py-8 px-4 sm:px-6 lg:px-8 space-y-2">
          <h1 className="text-2xl font-bold">{course.courseTitle}</h1>
          {course.subTitle && (
            <p className="text-neutral-300">{course.subTitle}</p>
          )}
          <p className="text-sm">
            Created by{" "}
            <span className="font-medium">
              {course.creator?.name || "Unknown Instructor"}
            </span>
          </p>
          <p className="text-sm">
            Students enrolled:{" "}
            <span className="font-semibold">
              {course.enrolledStudents?.length || 0}
            </span>
          </p>
        </div>
      </div>

      {/* DESCRIPTION */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-2">
          <div>
            <h2 className="text-xl font-semibold mb-3">Description</h2>
            <p
              className="text-neutral-500"
              dangerouslySetInnerHTML={{ __html: course.description }}
            />

            <Card className="my-4">
              <CardHeader>
                <CardTitle>Course Content</CardTitle>
                <CardDescription>
                  {course.lectures.length} lectures
                </CardDescription>
              </CardHeader>

              <CardContent>
                {course.lectures.map((lecture: TLecture) => (
                  <div className="flex gap-x-2 items-center" key={lecture._id}>
                    <span>
                      {purchased ? (
                        <PlayCircle size={14} />
                      ) : (
                        <Lock size={14} />
                      )}
                    </span>
                    <p>{lecture.lectureTitle}</p>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          <div className="w-fit justify-center mx-auto">
            <Card>
              <CardContent className="p-4 flex flex-col">
                <div className="w-full aspect-video">
                  <div className="w-full aspect-video rounded-md overflow-hidden">
                    {firstLecture?.videoUrl && (
                      <ReactPlayer
                        url={firstLecture.videoUrl}
                        controls
                        width="100%"
                        height="100%"
                      />
                    )}
                  </div>
                </div>

                <h2 className="mt-2 font-semibold">
                  {firstLecture?.lectureTitle}
                </h2>
                <Separator className="my-2" />
                <Label className="mt-2">
                  Course Price: ₹{data.course.coursePrice}
                </Label>
              </CardContent>

              <CardFooter>
                {purchased ? (
                  <Button onClick={handleContinue}>Go to course</Button>
                ) : (
                  <BuyCourseButton
                    courseId={courseId}
                    purchaseCourse={purchased}
                    onPurchaseSuccess={() => refetch()}
                  />
                )}
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

type BackendError = {
  message?: string;
  error?: string;
};

const getRTKErrorMessage = (
  error: FetchBaseQueryError | SerializedError | undefined,
): string | null => {
  if (!error) return null;

  // RTK Query errors
  if ("status" in error) {
    // Backend returned JSON
    if (error.data && typeof error.data === "object") {
      const data = error.data as BackendError;
      return data.message || data.error || "Something went wrong";
    }

    // Network / timeout / fetch error
    if ("error" in error && typeof error.error === "string") {
      return error.error;
    }

    return "Something went wrong";
  }

  // JS / runtime error
  return error.message ?? "Something went wrong";
};
