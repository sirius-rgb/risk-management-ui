import { StateCreator } from "zustand"

export interface Auth {
  isLoggedIn: boolean
  isAcceptTAndC: boolean
  showLoginModal: boolean
  showTAndCModal: boolean
  setShowLoginModal: (isOpen: boolean, isAccept: boolean) => void
  setTAndCModalOpen: (status: boolean) => void
  onAccountSelect?: (account: string) => void
  user: { username: string; avatar: string } | null
  setLoggedIn: (
    status: boolean,
    user?: { username: string; avatar: string }
  ) => void
  initializeAuth: () => void
}

export const createAuthSlice: StateCreator<Auth> = (set, get) => ({
  isLoggedIn: false,
  isAcceptTAndC: false,
  showLoginModal: false,
  showTAndCModal: false,
  setShowLoginModal: (isOpen, isAccept) =>
    set({ showLoginModal: isOpen, isAcceptTAndC: isAccept }),
  setTAndCModalOpen: (status) => set({ showLoginModal: status }),
  user: {
    username: "Unknown",
    avatar: "/avatar.png",
  },
  setLoggedIn: (status, user) => {
    set({ isLoggedIn: status, user: user || null })
    if (typeof window !== "undefined") {
      localStorage.setItem("isLoggedIn", status.toString())
    }
  },
  initializeAuth: () => {
    if (typeof window !== "undefined") {
      const storedIsLoggedIn = localStorage.getItem("isLoggedIn") === "true"
      set({ isLoggedIn: storedIsLoggedIn })
    }
  },
})
