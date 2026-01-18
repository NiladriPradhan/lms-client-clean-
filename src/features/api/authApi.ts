import type {
  AuthResponse,
  LoginRequest,
  RegisterRequest,
  User,
} from "@/types/auth.types";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { userLoggedIn, userLoogedOut } from "../authSlice";

const BASE_URL = import.meta.env.VITE_API_URL + "/api/v1/user/";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    credentials: "include",
  }),
  endpoints: (builder) => ({
    registerUser: builder.mutation<AuthResponse, RegisterRequest>({
      query: (inputData) => {
        return {
          url: "register",
          method: "POST",
          body: inputData,
        };
      },
    }),
    loginUser: builder.mutation<AuthResponse, LoginRequest>({
      query: (inputData) => ({
        url: "login",
        method: "POST",
        body: inputData,
      }),
      async onQueryStarted(_, { queryFulfilled, dispatch }) {
        try {
          const { data } = await queryFulfilled;
          if (data.user) {
            const userWithId = {
              ...data.user,
              id: data.user._id,
            };

            dispatch(userLoggedIn(userWithId));
          }
        } catch (err) {
          console.error("Login failed", err);
        }
      },
    }),

    logoutUser: builder.mutation({
      query: () => ({
        url: "logout",
        method: "GET",
      }),
      async onQueryStarted(_, { dispatch }) {
        try {
          dispatch(userLoogedOut());
        } catch (error) {
          console.log(error);
        }
      },
    }),
    loadUser: builder.query<AuthResponse, void>({
      query: () => ({
        url: "profile",
        method: "GET",
      }),
      async onQueryStarted(_, { queryFulfilled, dispatch }) {
        try {
          const { data } = await queryFulfilled;
          if (data.user) {
            const userWithId = {
              ...data.user,
              id: data.user._id,
            };
            dispatch(userLoggedIn(userWithId));
          }
        } catch (err) {
          console.error("Login failed", err);
        }
      },
    }),

    // updateUser: builder.mutation<UpdateUserResponse, FormData>({
    //   query: (formData) => ({
    //     url: "/user/update",
    //     method: "PUT",
    //     body: formData,
    //   }),
    // }),
    updateUser: builder.mutation<{ success: boolean; user: User }, FormData>({
      query: (formData) => ({
        url: "/profile/update",
        method: "PUT",
        body: formData,
      }),
    }),
  }),
});

export const {
  useRegisterUserMutation,
  useLoginUserMutation,
  useLogoutUserMutation,
  useLoadUserQuery,
  useUpdateUserMutation,
} = authApi;
