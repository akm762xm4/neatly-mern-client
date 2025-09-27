import { configureStore } from "@reduxjs/toolkit";
import { api } from "./serverApi";

// Configure store just for RTK Query
export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});
