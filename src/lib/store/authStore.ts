import { create } from "zustand"

type AuthState = {
  isLoggedIn: boolean
  user: { username: string; avatar: string } | null
  setLoggedIn: (
    status: boolean,
    user?: { username: string; avatar: string }
  ) => void
}

export const useAuthStore = create<AuthState>((set) => ({
  isLoggedIn: true,
  user: null,
  setLoggedIn: (status, user) =>
    set({ isLoggedIn: status, user: user || null }),
}))
