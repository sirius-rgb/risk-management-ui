import { StateCreator } from "zustand"

export interface Feedback {
  feedback: string
  rating: number
  hoverRating: number
  rated: boolean
  setRating: (rating: number) => void
  setHoverRating: (rating: number) => void
}

export const createFeedbackSlice: StateCreator<Feedback> = (set) => ({
  feedback: "",
  rating: 0,
  hoverRating: 0,
  rated: false,
  setFeedback(feedback) {
    set({ feedback })
  },
  setRating(rating) {
    set({ rating, rated: true })
  },
  setHoverRating(hoverRating) {
    set({ hoverRating })
  },
})
