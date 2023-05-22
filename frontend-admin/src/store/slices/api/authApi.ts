import { createApi } from "@reduxjs/toolkit/query/react";

import { setCredentials } from "../auth/authSlice";

import customFetchBase from "./customBaseQuery";
import { IUser } from "./types";
import { any } from "zod";

export interface AuthResponse {
  user: IUser;
  accessToken: string;
  success: boolean;
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
  }),
});

export const { useLoginUserMutation } = authApi;
