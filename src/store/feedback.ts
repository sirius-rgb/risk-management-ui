import { StateCreator } from "zustand"

export interface Feedback {
  // state
  feedback: string
  score: number
  hover_score: number
  error_level: number
  isSubmitted: boolean
  isLoading: boolean
  isFeedbackDialogOpen: boolean

  // reducer
  setFeedback: (feedback: string) => void
  setScore: (score: number) => void
  setHoverScore: (rating: number) => void
  setErrorLevel: (error_level: number) => void
  setSubmitted: (submitted: boolean) => void
  setLoading: (isLoading: boolean) => void
  setFeedbackDialogOpen: (isOpen: boolean) => void

  // effect
  resetFeedback: () => void
  submitFeedback: (
    request_id: string,
    score: number,
    error_level: number,
    feedback: string
  ) => Promise<void>
}

export const createFeedbackSlice: StateCreator<Feedback> = (set, get) => ({
  feedback: "",
  score: 0,
  hover_score: 0,
  error_level: 0,
  isSubmitted: false,
  isLoading: false,
  isFeedbackDialogOpen: false,

  setFeedback(feedback) {
    set({ feedback })
  },
  setScore(score) {
    set({ score })
  },
  setHoverScore(hover_score) {
    set({ hover_score })
  },
  setErrorLevel(error_level) {
    set({ error_level })
  },
  setSubmitted: (isSubmitted: boolean) => set({ isSubmitted }),
  setLoading: (isLoading: boolean) => set({ isLoading }),
  setFeedbackDialogOpen: (isFeedbackDialogOpen: boolean) =>
    set({ isFeedbackDialogOpen }),

  resetFeedback: () => {
    set({
      score: 0,
      hover_score: 0,
      isSubmitted: false,
      isLoading: false,
    })
  },
  submitFeedback: async (
    request_id: string,
    score: number,
    error_level: number,
    feedback: string
  ) => {
    if (get().isSubmitted) {
      return
    }

    set({ isLoading: true })

    try {
      const response = await fetch("http://localhost:8000/api/feedback", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          request_id,
          score,
          feedback,
          error_level,
        }),
      })

      if (!response.ok) {
        throw new Error("Network response was not ok")
      }

      await new Promise((resolve) => setTimeout(resolve, 500))

      const data = await response.json()
      console.log("Feedback sent successfully:", data)

      set({
        score: score,
        isSubmitted: true,
        isFeedbackDialogOpen: false,
        isLoading: false,
      })
    } catch (error) {
      console.error("Error sending feedback:", error)
      set({ isLoading: false })
    }
  },
})
