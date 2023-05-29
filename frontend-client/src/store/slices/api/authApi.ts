import { createApi } from "@reduxjs/toolkit/query/react";

import { setCredentials } from "../auth/authSlice";

import customFetchBase from "./customBaseQuery";
import { IUser } from "./types";

export interface AuthResponse {
  user: IUser;
  accessToken: string;
  success: boolean;
}

export interface RegisterResponse {
  success: boolean;
  message: string;
}

export interface VerifyResponse {
  success: boolean;
  message: string;
}

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: customFetchBase,
  tagTypes: ["Auth"],
  endpoints: (builder) => ({
    loginUser: builder.mutation<AuthResponse, any>({
      query: (credentials) => ({
        url: "auth/login",
        method: "POST",
        body: credentials,
        credentials: "include",
      }),

      transformResponse: (response: any) => {
        console.log("transformResponse", response);
        return response;
      },

      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        console.log("onQueryStarted", args, queryFulfilled);

        try {
          const data = await queryFulfilled;
          console.log("onQueryStarted data", data);

          if (data.data.success) {
            dispatch(
              setCredentials({
                user: data.data.user as IUser,
                token: data.data.accessToken as string,
              })
            );
          }
        } catch (err) {
          console.log("onQueryStarted error", err);
        }
      },
    }),

    registerUser: builder.mutation<RegisterResponse, any>({
      query: (credentials) => ({
        url: "auth/register",
        method: "POST",
        body: credentials,
        credentials: "include",
      }),

      transformResponse: (response: any) => {
        console.log("transformResponse", response);
        return response;
      },

      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        console.log("onQueryStarted", args, queryFulfilled);

        try {
          const data = await queryFulfilled;
          console.log("onQueryStarted data", data);

          if (data.data.success) {
          }
        } catch (err) {
          console.log("onQueryStarted error", err);
        }
      },
    }),

    verifyUser: builder.mutation<VerifyResponse, any>({
      query: (credentials) => ({
        url: "auth/verify-email",
        method: "POST",
        body: credentials,
        credentials: "include",
      }),

      transformResponse: (response: any) => {
        console.log("transformResponse", response);
        return response;
      },

      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        console.log("onQueryStarted", args, queryFulfilled);

        try {
          const data = await queryFulfilled;
          console.log("onQueryStarted data", data);

          if (data.data.success) {
          }
        } catch (err) {
          console.log("onQueryStarted error", err);
        }
      },
    }),

    sendVerificationEmail: builder.mutation<VerifyResponse, any>({
      query: (credentials) => ({
        url: "auth/resend-verify-email",
        method: "POST",
        body: credentials,
        credentials: "include",
      }),

      transformResponse: (response: any) => {
        console.log("transformResponse", response);
        return response;
      },

      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        console.log("onQueryStarted", args, queryFulfilled);

        try {
          const data = await queryFulfilled;
          console.log("onQueryStarted data", data);

          if (data.data.success) {
          }
        } catch (err) {
          console.log("onQueryStarted error", err);
        }
      },
    }),

    forgotPassword: builder.mutation<VerifyResponse, any>({
      query: (credentials) => ({
        url: "auth/forgot-password",
        method: "POST",
        body: credentials,
        credentials: "include",
      }),

      transformResponse: (response: any) => {
        console.log("transformResponse", response);
        return response;
      },

      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        console.log("onQueryStarted", args, queryFulfilled);

        try {
          const data = await queryFulfilled;
          console.log("onQueryStarted data", data);

          if (data.data.success) {
          }
        } catch (err) {
          console.log("onQueryStarted error", err);
        }
      },
    }),

    resetPassword: builder.mutation<VerifyResponse, any>({
      query: (credentials) => ({
        url: "auth/reset-password",
        method: "POST",
        body: credentials,
        credentials: "include",
      }),

      transformResponse: (response: any) => {
        console.log("transformResponse", response);
        return response;
      },

      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        console.log("onQueryStarted", args, queryFulfilled);

        try {
          const data = await queryFulfilled;
          console.log("onQueryStarted data", data);

          if (data.data.success) {
          }
        } catch (err) {
          console.log("onQueryStarted error", err);
        }
      },
    }),
  }),
});

export const {
  useLoginUserMutation,
  useRegisterUserMutation,
  useVerifyUserMutation,
  useSendVerificationEmailMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation,
} = authApi;
