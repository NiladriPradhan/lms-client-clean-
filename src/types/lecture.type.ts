// export type TLecture = {
//   _id: string | number;
//   lectureTitle:
//     | string
//     | number
//     | bigint
//     | boolean
//     | ReactElement<unknown, string | JSXElementConstructor<unknown>>
//     | Iterable<ReactNode>
//     | ReactPortal
//     | Promise<
//         | string
//         | number
//         | bigint
//         | boolean
//         | ReactPortal
//         | ReactElement<unknown, string | JSXElementConstructor<unknown>>
//         | Iterable<ReactNode>
//         | null
//         | undefined
//       >
//     | null
//     | undefined;
// };

export type TLecture = {
  _id: string;
  lectureTitle: string;
  videoUrl?: string;
};

export type EnrolledCourse = {
  _id: string;
  courseTitle: string;
  courseThumbnail?: string;
  courseLevel: "Beginner" | "Intermediate" | "Advanced";
  coursePrice: number;
  creator?: {
    name: string;
    photoUrl?: string;
  };
};

export type CourseWithCreator = EnrolledCourse & {
  creator: {
    name: string;
    photoUrl?: string;
  };
};
