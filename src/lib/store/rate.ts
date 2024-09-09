import { StateCreator } from "zustand"

export interface Rate {
  rating: number
  hoverRating: number
  rated: boolean
  setRating: (rating: number) => void
  setHoverRating: (rating: number) => void
  setRated: (rated: boolean) => void
}

export const createRateSlice: StateCreator<Rate> = (set) => ({
  rating: 5,
  hoverRating: 5,
  rated: false,
  setRating(rating) {
    set({ rating })
  },
  setHoverRating(hoverRating) {
    set({ hoverRating })
  },
  setRated(rated) {
    set({ rated })
  },
})
