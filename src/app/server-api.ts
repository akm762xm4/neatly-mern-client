import {
  BaseQueryFn,
  createApi,
  FetchArgs,
  fetchBaseQuery,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query/react";

const baseUrl = "https://notes-mern-server.vercel.app/";
// const baseUrl = "http://localhost:5000";

const baseQuery = fetchBaseQuery({
  baseUrl,
  prepareHeaders: (headers) => {
    const token = localStorage.getItem("token");
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

const baseQueryWithAuth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  const result = await baseQuery(args, api, extraOptions);

  const isAuthPage = window.location.pathname === "/auth";

  if (
    (result.error && result.error.status === 401) ||
    result.error?.status === 500
  ) {
    if (!isAuthPage) {
      localStorage.removeItem("token");
      window.location.href = "/auth";
    }
  }

  return result;
};

export const api = createApi({
  reducerPath: "api",
  baseQuery: baseQueryWithAuth,
  endpoints: () => ({}),
  tagTypes: ["Note", "User", "Task", "Overview"],
});
