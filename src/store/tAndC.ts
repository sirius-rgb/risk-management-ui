import { StateCreator } from "zustand"

export interface TermsAndConditions {
  isAcceptTAndC: boolean
  setAcceptTAndC: (isAcceptTAndC: boolean) => void
}

export const createTAndCSlice: StateCreator<TermsAndConditions> = (set) => ({
  isAcceptTAndC: false,
  setAcceptTAndC: (isAcceptTAndC) => set({ isAcceptTAndC }),
})
