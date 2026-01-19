// /* eslint-disable react-hooks/set-state-in-effect */
// import LectureComp from "@/components/LectureComp";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";

// import { useTheme } from "@/context/useTheme";
// import {
//   useCreateLectureMutation,
//   useGetCourseByIdQuery,
//   useGetCourseLectureQuery,
// } from "@/features/api/courseApi";
// import { Loader } from "lucide-react";
// import { useEffect, useState } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import { toast } from "sonner";

// export type TLecture = {
//   _id: string;
//   lectureTitle?: string;
// };

// export default function Lecture() {
//   const navigate = useNavigate();
//   const courseId = useParams().courseId as string;

//   const { theme } = useTheme();

//   const [lectureTitle, setLectureTitle] = useState("");

//   const { data: courseById } = useGetCourseByIdQuery(courseId);
//   const course = courseById?.course;
//   const [
//     createLecture,
//     {
//       data,
//       isLoading: createLectureLoading,
//       isSuccess: createLectureSuccess,
//       error: createLectureError,
//     },
//   ] = useCreateLectureMutation();

//   const {
//     data: lectureData,
//     // isSuccess: lectureSuccess,
//     isLoading: lectureLoading,
//     error: lectureError,
//     refetch,
//   } = useGetCourseLectureQuery(courseId);

//   console.log("getCourseLecture", lectureData);

//   const handleLectureCreate = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();

//     if (!lectureTitle.trim()) {
//       toast.error("Lecture title is required");
//       return;
//     }

//     await createLecture({ lectureTitle, courseId });
//   };

//   if (createLectureSuccess) {
//     setLectureTitle("");
//     refetch();
//     toast.success(data.message ?? "Lecture created successfully");
//   }

//   // useEffect(() => {
//   //   if (createLectureSuccess) {
//   //     refetch();
//   //     toast.success(data.message ?? "Lecture created successfully");
//   //   }
//   //   if (createLectureError && "data" in createLectureError) {
//   //     const errMsg =
//   //       typeof createLectureError.data === "object" &&
//   //       createLectureError.data !== null &&
//   //       "message" in createLectureError.data
//   //         ? (createLectureError.data as { message: string }).message
//   //         : "Failed to course update";

//   //     toast.error(errMsg);
//   //   }
//   //   if (lectureError && "data" in lectureError) {
//   //     const errMsg =
//   //       typeof lectureError.data === "object" &&
//   //       lectureError.data !== null &&
//   //       "message" in lectureError.data
//   //         ? (lectureError.data as { message: string }).message
//   //         : "Failed to fetch lectures";

//   //     toast.error(errMsg);
//   //   }
//   // }, [data, createLectureSuccess, createLectureError, lectureError, refetch]);

//   useEffect(() => {
//     if (createLectureSuccess) {
//       setLectureTitle("");
//       refetch();
//       toast.success(data?.message ?? "Lecture created successfully");
//     }

//     if (createLectureError && "data" in createLectureError) {
//       const errMsg =
//         typeof createLectureError.data === "object" &&
//         createLectureError.data !== null &&
//         "message" in createLectureError.data
//           ? (createLectureError.data as { message: string }).message
//           : "Failed to create lecture";

//       toast.error(errMsg);
//     }
//   }, [createLectureSuccess, createLectureError, refetch, data?.message]);

//   const themeClasses =
//     theme === "light"
//       ? "bg-white text-black"
//       : theme === "dark"
//         ? "bg-gray-900 text-white"
//         : "bg-gray-950 text-white";
//   return (
//     <>
//       <div className={`${themeClasses}`}>
//         <div className="flex flex-col mb-4">
//           <h2 className="text-2xl font-semibold">
//             Let's,, add lecture, add some basic details for your new lecture. -{" "}
//             {course?.courseTitle}
//           </h2>
//           <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
//         </div>
//         <form
//           className="flex flex-col space-y-2"
//           onSubmit={handleLectureCreate}
//         >
//           <div className="flex flex-col space-y-2">
//             <Label>Title</Label>
//             <Input
//               className="w-full"
//               placeholder="Your Lecture Name"
//               type="text"
//               name="lectureTitle"
//               value={lectureTitle}
//               onChange={(e) => setLectureTitle(e.target.value)}
//             />
//           </div>
//           <div className="flex  gap-x-2 my-2">
//             <Button
//               type="button"
//               variant={"outline"}
//               onClick={() => navigate("/admin/courses")}
//               className={`outline ${
//                 theme === "light"
//                   ? "text-white  bg-red-400"
//                   : theme === "dark"
//                     ? "text-white  bg-gray-800"
//                     : "text-white bg-gray-800"
//               }`}
//             >
//               Cancel
//             </Button>
//             <Button type="submit" variant={"default"}>
//               {createLectureLoading ? (
//                 <>
//                   <div className="flex items-center">
//                     <Loader className="h-6 w-6 mr-2" />
//                     <span className="">Loading...</span>
//                   </div>
//                 </>
//               ) : (
//                 "Create Lecture"
//               )}
//             </Button>
//           </div>
//         </form>
//         <div className="mt-4">
//           {lectureLoading ? (
//             <span>
//               <Loader className="h-6 w-6" />
//               <p className="font-medium">Loading Lecture</p>
//             </span>
//           ) : lectureError ? (
//             <p>Failed to load lecture</p>
//           ) : lectureData.lectures.length === 0 ? (
//             <p>No lecture available</p>
//           ) : (
//             lectureData.lectures.map((lecture: TLecture, index: number) => (
//               <LectureComp
//                 key={lecture._id}
//                 lecture={lecture}
//                 index={index}
//                 courseId={courseId}
//               />
//             ))
//           )}
//         </div>
//       </div>
//     </>
//   );
// }

import LectureComp from "@/components/LectureComp";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { useTheme } from "@/context/useTheme";
import {
  useCreateLectureMutation,
  useGetCourseByIdQuery,
  useGetCourseLectureQuery,
} from "@/features/api/courseApi";
import { Loader } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";

export type TLecture = {
  _id: string;
  lectureTitle?: string;
};

export default function Lecture() {
  const navigate = useNavigate();
  const { courseId } = useParams<{ courseId: string }>();

  const { theme } = useTheme();
  const [lectureTitle, setLectureTitle] = useState("");

  /* ================= API ================= */

  const { data: courseById } = useGetCourseByIdQuery(courseId!);
  const course = courseById?.course;

  const [
    createLecture,
    {
      data: createLectureData,
      isLoading: createLectureLoading,
      isSuccess: createLectureSuccess,
      error: createLectureError,
    },
  ] = useCreateLectureMutation();

  const {
    data: lectureData,
    isLoading: lectureLoading,
    error: lectureError,
  } = useGetCourseLectureQuery(courseId!);

  /* ================= HANDLERS ================= */

  const handleLectureCreate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!lectureTitle.trim()) {
      toast.error("Lecture title is required");
      return;
    }

    await createLecture({ lectureTitle, courseId: courseId! });
  };

  /* ================= SIDE EFFECTS ================= */

  useEffect(() => {
    if (createLectureSuccess) {
      setLectureTitle("");
      toast.success(
        createLectureData?.message ?? "Lecture created successfully",
      );
    }

    if (createLectureError && "data" in createLectureError) {
      const errMsg =
        typeof createLectureError.data === "object" &&
        createLectureError.data !== null &&
        "message" in createLectureError.data
          ? (createLectureError.data as { message: string }).message
          : "Failed to create lecture";

      toast.error(errMsg);
    }
  }, [createLectureSuccess, createLectureError, createLectureData?.message]);

  /* ================= THEME ================= */

  const themeClasses =
    theme === "light"
      ? "bg-white text-black"
      : theme === "dark"
        ? "bg-gray-900 text-white"
        : "bg-gray-950 text-white";

  /* ================= UI ================= */

  return (
    <div className={themeClasses}>
      {/* HEADER */}
      <div className="flex flex-col mb-4">
        <h2 className="text-2xl font-semibold">
          Add lecture for — {course?.courseTitle}
        </h2>
        <p className="text-sm text-muted-foreground">
          Add basic details for your new lecture
        </p>
      </div>

      {/* FORM */}
      <form className="flex flex-col space-y-3" onSubmit={handleLectureCreate}>
        <div className="flex flex-col space-y-2">
          <Label>Lecture Title</Label>
          <Input
            placeholder="Your Lecture Name"
            value={lectureTitle}
            onChange={(e) => setLectureTitle(e.target.value)}
          />
        </div>

        <div className="flex gap-2">
          <Button
            type="button"
            variant="outline"
            onClick={() => navigate("/admin/courses")}
          >
            Cancel
          </Button>

          <Button type="submit" disabled={createLectureLoading}>
            {createLectureLoading ? (
              <div className="flex items-center gap-2">
                <Loader className="h-4 w-4 animate-spin" />
                Creating...
              </div>
            ) : (
              "Create Lecture"
            )}
          </Button>
        </div>
      </form>

      {/* LECTURE LIST */}
      <div className="mt-6">
        {lectureLoading ? (
          <div className="flex items-center gap-2">
            <Loader className="h-5 w-5 animate-spin" />
            <span>Loading lectures...</span>
          </div>
        ) : lectureError ? (
          <p className="text-red-500">Failed to load lectures</p>
        ) : lectureData?.lectures?.length === 0 ? (
          <p>No lectures available</p>
        ) : (
          lectureData?.lectures?.map((lecture: TLecture, index: number) => (
            <LectureComp
              key={lecture._id}
              lecture={lecture}
              index={index}
              courseId={courseId!}
            />
          ))
        )}
      </div>
    </div>
  );
}
