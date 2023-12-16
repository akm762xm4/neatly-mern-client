import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
const BASE_URL = import.meta.env.VITE_BACKEND_BASE_URL
export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  endpoints: () => ({}),
  tagTypes: ["note", "user"],
})
