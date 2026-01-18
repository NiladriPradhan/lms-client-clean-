export type User = {
  _id: string;
  name: string;
  email: string;
  role: string | "student" | "admin" | "instructor";
  photoUrl?: string;
  enrolledCourses: EnrolledCourse[];
} | null;

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export type AuthResponse = {
  message: string;
  success: boolean;
  user: User;
};

export interface UpdateUserResponse {
  success: boolean;
  user: {
    name: string;
    email: string;
    bio?: string;
    photoUrl?: string;
  };
}

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

type Course = {
  description: any;
  _id: string;
  courseTitle: string;
  courseDescription: string;
  courseThumbnail: string;
  courseLevel: string;
  coursePrice?: number;
  isPublished: boolean;
  creator: {
    _id: string;
    name: string;
    photoUrl?: string;
  };
};

export type GetCoursesResponse = {
  success: boolean;
  courses: Course[];
  publishedCourses: Course[];
};

// types/course.ts
export type InputData = {
  courseTitle: string;
  subTitle: string;
  description: string;
  category: string;
  courseLevel: string;
  coursePrice: string;
  courseThumbnail: File | string | null;
};

// search query

export type GetSearchResponse = {
  success: boolean;
  courses: Course[];
  totalCourses: number;
};
