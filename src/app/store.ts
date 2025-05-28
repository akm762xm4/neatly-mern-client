import { configureStore } from "@reduxjs/toolkit";
import { api } from "./server-api";
import userReducers from "../features/user/api/userSlice";
export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    user: userReducers,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
