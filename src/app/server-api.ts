import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://notes-mern-server.vercel.app",
  }),
  endpoints: () => ({}),
  tagTypes: ["note", "user"],
})
