import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const COURSE_PURCHASE_API = "http://localhost:5000/api/v1/purchase";

export const purchaseApi = createApi({
  reducerPath: "purchaseApi",
  baseQuery: fetchBaseQuery({
    baseUrl: COURSE_PURCHASE_API,
    credentials: "include",
  }),
  endpoints: (builder) => ({
    // ✅ CREATE CHECKOUT
    createCheckoutSession: builder.mutation<
      { url: string },
      { courseId: string }
    >({
      query: (body) => ({
        url: "/checkout/create-checkout-session",
        method: "POST",
        body,
      }),
    }),

    // ✅ GET COURSE + PURCHASE STATUS
    getPurchasedCourseDetailWithStatus: builder.query({
      query: (courseId) => ({
        url: `/course/${courseId}/detail-with-status`,
        method: "GET",
      }),
    }),
    // ✅ GET COURSEs + PURCHASE STATUS
    getPurchasedCourses: builder.query({
      query: () => ({
        url: `/`,
        method: "GET",
      }),
    }),
  }),
});

// ✅ EXPORT BOTH HOOKS
export const {
  useCreateCheckoutSessionMutation,
  useGetPurchasedCourseDetailWithStatusQuery,
  useGetPurchasedCoursesQuery,
} = purchaseApi;

export default purchaseApi;
