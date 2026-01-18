import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import {
  useCompleteCourseMutation,
  useGetCourseProgressQuery,
  useInCompleteCourseMutation,
  useUpdateLectureProgressMutation,
} from "@/features/api/courseProgressApi";
import { CheckCircle, CheckCircle2, CirclePlay } from "lucide-react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "sonner";

/* =======================
   Types & Interfaces
======================= */

interface Lecture {
  _id: string;
  lectureTitle: string;
  videoUrl: string;
}

interface CourseDetails {
  courseTitle: string;
  lectures: Lecture[];
}

interface LectureProgress {
  lectureId: string;
  viewed: boolean;
}

interface CourseProgressResponse {
  data: {
    courseDetails: CourseDetails;
    progress: LectureProgress[];
    completed: boolean;
  };
  message?: string;
}

const CourseProgress = () => {
  const { courseId } = useParams<{ courseId: string }>();

  const { data, isLoading, isError, refetch } = useGetCourseProgressQuery(
    courseId as string
  );

  const [updateLectureProgress] = useUpdateLectureProgressMutation();

  const [
    completeCourse,
    { data: markCompleteData, isSuccess: completedSuccess },
  ] = useCompleteCourseMutation();

  const [
    inCompleteCourse,
    { data: markInCompleteData, isSuccess: inCompletedSuccess },
  ] = useInCompleteCourseMutation();

  const [currentLecture, setCurrentLecture] = useState<Lecture | null>(null);

  /* =======================
     Side Effects
  ======================= */

  useEffect(() => {
    if (completedSuccess && markCompleteData) {
      refetch();
      toast.success(markCompleteData.message);
    }

    if (inCompletedSuccess && markInCompleteData) {
      refetch();
      toast.success(markInCompleteData.message);
    }
  }, [
    completedSuccess,
    inCompletedSuccess,
    markCompleteData,
    markInCompleteData,
    refetch,
  ]);

  /* =======================
     Loading & Error States
  ======================= */

  if (isLoading) return <p>Loading...</p>;
  if (isError || !data) return <p>Failed to load course details</p>;

  /* =======================
     Data Extraction
  ======================= */

  const { courseDetails, progress, completed } = (
    data as CourseProgressResponse
  ).data;

  const { courseTitle, lectures } = courseDetails;

  const initialLecture = currentLecture || (lectures && lectures[0]);

  /* =======================
     Helper Functions
  ======================= */

  const isLectureCompleted = (lectureId: string): boolean => {
    return progress.some((prog) => prog.lectureId === lectureId && prog.viewed);
  };

  const handleLectureProgress = async (lectureId: string) => {
    await updateLectureProgress({ courseId, lectureId });
    refetch();
  };

  const handleSelectLecture = (lecture: Lecture) => {
    setCurrentLecture(lecture);
    handleLectureProgress(lecture._id);
  };

  const handleCompleteCourse = async () => {
    await completeCourse(courseId as string);
  };

  const handleInCompleteCourse = async () => {
    await inCompleteCourse(courseId as string);
  };

  /* =======================
     JSX
  ======================= */

  return (
    <div className="max-w-7xl mx-auto p-4">
      {/* Course Header */}
      <div className="flex justify-between mb-4">
        <h1 className="text-2xl font-bold">{courseTitle}</h1>
        <Button
          onClick={completed ? handleInCompleteCourse : handleCompleteCourse}
          variant={completed ? "outline" : "default"}
        >
          {completed ? (
            <div className="flex items-center">
              <CheckCircle className="h-4 w-4 mr-2" />
              <span>Completed</span>
            </div>
          ) : (
            "Mark as completed"
          )}
        </Button>
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Video Section */}
        <div className="flex-1 md:w-3/5 h-fit rounded-lg shadow-lg p-4">
          <video
            src={initialLecture.videoUrl}
            controls
            className="w-full h-auto md:rounded-lg"
            onPlay={() => handleLectureProgress(initialLecture._id)}
          />

          <div className="mt-2">
            <h3 className="font-medium text-lg">
              {`Lecture ${
                lectures.findIndex((lec) => lec._id === initialLecture._id) + 1
              } : ${initialLecture.lectureTitle}`}
            </h3>
          </div>
        </div>

        {/* Lecture Sidebar */}
        <div className="flex flex-col w-full md:w-2/5 border-t md:border-t-0 md:border-l border-gray-200 md:pl-4 pt-4 md:pt-0">
          <h2 className="font-semibold text-xl mb-4">Course Lecture</h2>

          <div className="flex-1 overflow-y-auto">
            {lectures.map((lecture) => (
              <Card
                key={lecture._id}
                className={`mb-3 hover:cursor-pointer transition ${
                  lecture._id === currentLecture?._id
                    ? "bg-gray-200 dark:bg-gray-800"
                    : ""
                }`}
                onClick={() => handleSelectLecture(lecture)}
              >
                <CardContent className="flex items-center justify-between p-4">
                  <div className="flex items-center">
                    {isLectureCompleted(lecture._id) ? (
                      <CheckCircle2 size={24} className="text-green-500 mr-2" />
                    ) : (
                      <CirclePlay size={24} className="text-gray-500 mr-2" />
                    )}

                    <CardTitle className="text-lg font-medium">
                      {lecture.lectureTitle}
                    </CardTitle>
                  </div>

                  {isLectureCompleted(lecture._id) && (
                    <Badge
                      variant="outline"
                      className="bg-green-200 text-green-600"
                    >
                      Completed
                    </Badge>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseProgress;
