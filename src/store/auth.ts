import { Session } from "next-auth"
import { StateCreator } from "zustand"

export interface Auth {
  session: Session | null
  setSession: (session: Session | null) => void
  showLoginModal: boolean
  showTAndCModal: boolean
  setShowLoginModal: (isOpen: boolean) => void
  setTAndCModalOpen: (status: boolean) => void
}

export const createAuthSlice: StateCreator<Auth> = (set) => ({
  session: null,
  setSession: (session) => set({ session }),
  showLoginModal: false,
  showTAndCModal: false,
  setShowLoginModal: (isOpen) => set({ showLoginModal: isOpen }),
  setTAndCModalOpen: (status) => set({ showTAndCModal: status }),
})
