// src/store/authStore.ts
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface User {
  id: string;
  name: string;
  email: string;
}

interface AuthState {
  user: User | null;
  accessToken: string | null;
  setCredentials: (data: { user?: User; accessToken: string }) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      accessToken: null,
      setCredentials: ({ user, accessToken }) =>
        set((state) => ({
          user: user ?? state.user, // keep old user if not provided
          accessToken,
        })),
      logout: () => set({ user: null, accessToken: null }),
    }),
    {
      name: "auth-storage", // localStorage key
      getStorage: () => localStorage, // or sessionStorage
    }
  )
);
