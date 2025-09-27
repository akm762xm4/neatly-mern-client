import {
  BaseQueryFn,
  createApi,
  FetchArgs,
  fetchBaseQuery,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query/react";
import { useAuthStore } from "./authStore";

// const baseUrl = "https://neatly-mern-server.vercel.app/";
const baseUrl = "http://localhost:5000";

const rawBaseQuery = fetchBaseQuery({
  baseUrl,
  credentials: "include", // important so refresh cookie works
  prepareHeaders: (headers) => {
    // Get the current token from the store
    const accessToken = useAuthStore.getState().accessToken;

    if (accessToken) {
      headers.set("authorization", `Bearer ${accessToken}`);
    }
    return headers;
  },
});

const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  let result = await rawBaseQuery(args, api, extraOptions);

  if (result.error && result.error.status === 401) {
    // try refresh
    const refreshResult = await rawBaseQuery(
      "/auth/refresh",
      api,
      extraOptions
    );

    if (refreshResult.data) {
      const { accessToken } = refreshResult.data as { accessToken: string };
      localStorage.setItem("token", accessToken);
      // Use the store's setState method
      useAuthStore.getState().setCredentials({ accessToken });

      // retry the original query
      result = await rawBaseQuery(args, api, extraOptions);
    } else {
      // Use the store's setState method
      useAuthStore.getState().logout();
      localStorage.removeItem("token");
      window.location.href = "/auth";
    }
  }

  return result;
};

export const api = createApi({
  reducerPath: "api",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["Note", "User", "Task", "Dashboard", "Auth"],
  endpoints: (builder) => ({
    // 🔑 Auth
    register: builder.mutation<
      {
        accessToken: string;
        user: { id: string; name: string; email: string };
      },
      { name: string; email: string; password: string }
    >({
      query: (body) => ({
        url: "api/auth/register",
        method: "POST",
        body,
      }),
    }),
    login: builder.mutation<
      {
        accessToken: string;
        user: { id: string; name: string; email: string };
      },
      { email: string; password: string }
    >({
      query: (body) => ({
        url: "api/auth/login",
        method: "POST",
        body,
      }),
    }),
    refresh: builder.query<{ accessToken: string }, void>({
      query: () => "api/auth/refresh",
    }),
    logout: builder.mutation<{ message: string }, void>({
      query: () => ({
        url: "api/auth/logout",
        method: "POST",
      }),
    }),
    me: builder.query<{ id: string; name: string; email: string }, void>({
      query: () => "api/auth/me",
    }),

    // 📝 Notes, tasks, etc. stay here
  }),
});

export const {
  useRegisterMutation,
  useLoginMutation,
  useRefreshQuery,
  useLogoutMutation,
  useMeQuery,
  // other entity hooks...
} = api;
