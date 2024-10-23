import { StateCreator } from "zustand"

export interface Auth {
  isLoggedIn: boolean
  isAcceptTAndC: boolean
  showLoginModal: boolean
  showTAndCModal: boolean
  token: string
  setToken: (token: string) => void
  setShowLoginModal: (isOpen: boolean, isAccept: boolean) => void
  setTAndCModalOpen: (status: boolean) => void
  onAccountSelect?: (account: string) => void
  user: {
    name: string
    mail: string
    title: string
    department: string
    country: string
    avatar: string
  }
  setLoggedIn: (
    status: boolean,
    user?: { username: string; avatar: string }
  ) => void
  setUser: (user: {
    name: string
    mail: string
    title: string
    department: string
    country: string
    avatar: string
  }) => void
  initializeAuth: () => void
}

export const createAuthSlice: StateCreator<Auth> = (set, get) => ({
  isLoggedIn: false,
  isAcceptTAndC: false,
  showLoginModal: false,
  showTAndCModal: false,
  token: "",
  setToken: (token) => set({ token }),
  setShowLoginModal: (isOpen, isAccept) =>
    set({ showLoginModal: isOpen, isAcceptTAndC: isAccept }),
  setTAndCModalOpen: (status) => set({ showLoginModal: status }),
  user: {
    name: "",
    mail: "",
    title: "",
    department: "",
    country: "",
    avatar: "",
  },
  // setUser: (user) => set({ user }),
  setUser: (userData) => {
    set({ user: userData })
    localStorage.setItem("user", JSON.stringify(userData)) // 存储到 localStorage
  },
  setLoggedIn: (status) => {
    set({ isLoggedIn: status })
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
