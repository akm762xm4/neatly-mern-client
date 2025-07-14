import { api } from "../../app/server-api";
import { SignUpAndLogin, SignupCredentials, LoginCredentials, User } from ".";

export const usersApi = api.injectEndpoints({
  endpoints: (builder) => ({
    signUp: builder.mutation<SignUpAndLogin, SignupCredentials>({
      query: (body) => ({
        url: "/api/users/signup",
        method: "POST",
        body,
      }),
      invalidatesTags: ["User"],
    }),
    signIn: builder.mutation<SignUpAndLogin, LoginCredentials>({
      query: (body) => ({
        url: "/api/users/login",
        method: "POST",
        body,
      }),
      invalidatesTags: ["User"],
    }),
    getMe: builder.query<User, void>({
      query: () => ({
        url: "/api/users/",
      }),
      providesTags: ["User"],
    }),
  }),
});

export const { useSignUpMutation, useSignInMutation, useGetMeQuery } = usersApi;
