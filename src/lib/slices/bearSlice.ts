import { create, StateCreator } from "zustand"

export interface BearSlice {
  bears: number
  addBear: () => void
  eatFish: () => void
}

export const createBearSlice: StateCreator<BearSlice> = (set) => ({
  bears: 1,
  addBear: () => set((state) => ({ bears: state.bears + 1 })),
  eatFish: () => set((state) => ({ bears: state.bears - 1 })),
})
