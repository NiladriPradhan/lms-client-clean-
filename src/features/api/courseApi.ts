// import type { GetCoursesResponse } from "@/types/auth.types";
// import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// const BASE_URL = "http://localhost:5000/api/v1/course/";

// export const courseApi = createApi({
//   reducerPath: "courseApi",
//   tagTypes: ["Refetch_Creator_Course", "Refetch_Lecture"],
//   baseQuery: fetchBaseQuery({
//     baseUrl: BASE_URL,
//     credentials: "include",
//   }),
//   endpoints: (builder) => ({
//     createCourse: builder.mutation({
//       query: ({ courseTitle, category }) => ({
//         url: "create",
//         method: "POST",
//         body: { courseTitle, category },
//       }),
//       invalidatesTags: ["Refetch_Creator_Course"],
//     }),
//     getAllCourse: builder.query<GetCoursesResponse, void>({
//       query: () => ({
//         url: "courses",
//         method: "GET",
//       }),
//       providesTags: ["Refetch_Creator_Course"],
//     }),
//     editCourse: builder.mutation({
//       query: ({ formData, courseId }) => ({
//         url: `/${courseId}`,
//         method: "PUT",
//         body: formData,
//       }),
//       invalidatesTags: ["Refetch_Creator_Course"],
//     }),
//     getCourseById: builder.query({
//       query: (courseId) => ({
//         url: `/${courseId}`,
//         method: "GET",
//       }),

//     }),
//     createLecture: builder.mutation({
//       query: ({ lectureTitle, courseId }) => ({
//         url: `/${courseId}/lecture`,
//         method: "POST",
//         body: { lectureTitle },
//       }),
//     }),
//     getCourseLecture: builder.query({
//       query: (courseId) => ({
//         url: `/${courseId}/lecture`,
//         method: "GET",
//       }),
//       providesTags: ["Refetch_Lecture"],
//     }),
//     editLecture: builder.mutation({
//       query: ({
//         lectureTitle,
//         videoInfo,
//         isPreviewFree,
//         courseId,
//         lectureId,
//       }) => ({
//         url: `/${courseId}/lecture/${lectureId}`,
//         method: "PUT",
//         body: { lectureTitle, videoInfo, isPreviewFree },
//       }),
//     }),
//     removeLecture: builder.mutation({
//       query: (lectureId) => ({
//         url: `lecture/${lectureId}`,
//         method: "DELETE",
//       }),
//       invalidatesTags: ["Refetch_Lecture"],
//     }),
//     getLectureById: builder.query({
//       query: (lectureId) => ({
//         url: `lecture/${lectureId}`,
//         method: "GET",
//       }),
//     }),
//     publishCourse: builder.mutation({
//       query: ({ courseId, publish }) => ({
//         url: `/${courseId}?publish=${publish}`,
//         method: "PATCH",
//       }),
//     }),
//   }),
// });

// export const {
//   useCreateCourseMutation,
//   useGetAllCourseQuery,
//   useEditCourseMutation,
//   useGetCourseByIdQuery,
//   useCreateLectureMutation,
//   useGetCourseLectureQuery,
//   useEditLectureMutation,
//   useRemoveLectureMutation,
//   useGetLectureByIdQuery,
//   usePublishCourseMutation,
// } = courseApi;

import type { GetCoursesResponse, GetSearchResponse } from "@/types/auth.types";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const BASE_URL = import.meta.env.VITE_API_URL + "/api/v1/course";

export const courseApi = createApi({
  reducerPath: "courseApi",

  // ❌ remove empty string
  // ✅ define only real tags
  tagTypes: ["Course", "CreatorCourse", "Lecture"],

  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    credentials: "include",
  }),

  endpoints: (builder) => ({
    /* ================= COURSES ================= */

    createCourse: builder.mutation({
      query: ({ courseTitle, category }) => ({
        url: "/create",
        method: "POST",
        body: { courseTitle, category },
      }),
      invalidatesTags: ["CreatorCourse"],
    }),

    getAllCourse: builder.query<GetCoursesResponse, void>({
      query: () => ({
        url: "/courses",
        method: "GET",
      }),
      providesTags: ["CreatorCourse"],
    }),

    getPublishedCourse: builder.query<GetCoursesResponse, void>({
      query: () => ({
        url: "/published-courses",
        method: "GET",
      }),
      providesTags: ["CreatorCourse"],
    }),

    editCourse: builder.mutation({
      query: ({ formData, courseId }) => ({
        url: `/${courseId}`,
        method: "PUT",
        body: formData,
      }),
      invalidatesTags: ["CreatorCourse", "Course"],
    }),

    getCourseById: builder.query({
      query: (courseId) => ({
        url: `/${courseId}`,
        method: "GET",
      }),
      providesTags: ["Course"],
    }),

    publishCourse: builder.mutation({
      query: ({ courseId, publish }) => ({
        url: `/${courseId}?publish=${publish}`,
        method: "PATCH",
      }),
      // ✅ THIS FIXES TOGGLE ISSUE
      invalidatesTags: ["Course"],
    }),
    getSearchCourse: builder.query<
      GetSearchResponse,
      {
        query: string | null;
        categories: string[];
        sortByPrice: string;
      }
    >({
      query: ({
        query,
        categories,
        sortByPrice,
      }: {
        query: string;
        categories: string[];
        sortByPrice: string;
      }) => {
        // let queryString = `/search?query=${query}&categories=${categories}&sortByPrice=${sortByPrice}`,
        let queryString = `/search?query=${encodeURIComponent(query)}`;
        if (categories && categories.length > 0) {
          const categoriesString = categories.map(encodeURIComponent).join(",");
          queryString += `&categories=${categoriesString}`;
        }
        if (sortByPrice) {
          queryString += `&sortByPrice=${encodeURIComponent(sortByPrice)}`;
        }
        return {
          url: queryString,
          method: "GET",
        };
      },
    }),
    /* ================= LECTURES ================= */

    createLecture: builder.mutation<
      { success: boolean; message: string },
      { lectureTitle: string; courseId: string }
    >({
      query: ({ lectureTitle, courseId }) => ({
        url: `/${courseId}/lecture`,
        method: "POST",
        body: { lectureTitle },
      }),
      invalidatesTags: ["Lecture"],
    }),

    getCourseLecture: builder.query({
      query: (courseId) => ({
        url: `/${courseId}/lecture`,
        method: "GET",
      }),
      providesTags: ["Lecture"],
    }),

    editLecture: builder.mutation({
      query: ({
        lectureTitle,
        videoInfo,
        isPreviewFree,
        courseId,
        lectureId,
      }) => ({
        url: `/${courseId}/lecture/${lectureId}`,
        method: "PUT",
        body: { lectureTitle, videoInfo, isPreviewFree },
      }),
      invalidatesTags: ["Lecture"],
    }),

    removeLecture: builder.mutation({
      query: (lectureId) => ({
        url: `/lecture/${lectureId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Lecture"],
    }),

    getLectureById: builder.query({
      query: (lectureId) => ({
        url: `/lecture/${lectureId}`,
        method: "GET",
      }),
      providesTags: ["Lecture"],
    }),
  }),
});

export const {
  useCreateCourseMutation,
  useGetAllCourseQuery,
  useGetPublishedCourseQuery,
  useEditCourseMutation,
  useGetCourseByIdQuery,
  useGetSearchCourseQuery,
  useCreateLectureMutation,
  useGetCourseLectureQuery,
  useEditLectureMutation,
  useRemoveLectureMutation,
  useGetLectureByIdQuery,
  usePublishCourseMutation,
} = courseApi;
