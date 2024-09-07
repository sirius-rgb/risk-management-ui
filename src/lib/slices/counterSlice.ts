// src/store/slices/counterSlice.ts
import { StateCreator } from "zustand"

export interface CounterSlice {
  count: number
  increment: () => void
  decrement: () => void
}

export const createCounterSlice: StateCreator<CounterSlice> = (set) => ({
  count: 2,
  increment: () => set((state) => ({ count: state.count + 1 })),
  decrement: () => set((state) => ({ count: state.count - 1 })),
})
