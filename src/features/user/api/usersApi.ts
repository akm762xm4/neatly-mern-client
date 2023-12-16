import { api } from "../../../app/server-api"
import {
  SignUpAndLogin,
  SignupCredentials,
  LoginCredentials,
  User,
} from "../types"
const token = localStorage.getItem("token")

export const usersApi = api.injectEndpoints({
  endpoints: (builder) => ({
    signUp: builder.mutation<SignUpAndLogin, SignupCredentials>({
      query: (body) => ({
        url: "/api/users/signup",
        method: "POST",
        body,
      }),
      invalidatesTags: ["user"],
    }),
    signIn: builder.mutation<SignUpAndLogin, LoginCredentials>({
      query: (body) => ({
        url: "/api/users/login",
        method: "POST",
        body,
      }),
      invalidatesTags: ["user"],
    }),
    getMe: builder.query<User, void>({
      query: () => ({
        url: "/api/users/",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
      providesTags: ["user"],
    }),
  }),
})

export const { useSignUpMutation, useSignInMutation, useGetMeQuery } = usersApi
