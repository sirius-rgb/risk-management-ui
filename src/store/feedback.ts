import { StateCreator } from "zustand"

export interface Feedback {
  feedback: string
  rating: number
  hoverRating: number
  rated: boolean
  isFeedbackDialogOpen: boolean
  setFeedbackDialogOpen: (isOpen: boolean) => void
  setFeedback: (feedback: string) => void
  setRating: (rating: number) => void
  setRated: (rated: boolean) => void
  setHoverRating: (rating: number) => void
  sendRating: (
    rating: number,
    feedback: string,
    issue_id: string,
    request_id: string
  ) => Promise<void>
  sendFeedback: (
    rating: number,
    feedback: string,
    issue_id: string,
    request_id: string
  ) => Promise<void>
}

export const createFeedbackSlice: StateCreator<Feedback> = (set) => ({
  feedback: "",
  rating: 0,
  hoverRating: 0,
  rated: false,
  isFeedbackDialogOpen: false,
  setFeedbackDialogOpen: (isOpen: boolean) => {
    set({ isFeedbackDialogOpen: isOpen })
  },
  setFeedback(feedback) {
    set({ feedback })
  },
  setRating(rating) {
    set({ rating })
  },
  setRated(rated) {
    set({ rated })
  },
  setHoverRating(hoverRating) {
    set({ hoverRating })
  },
  sendRating: async (rating: number, issue_id: string, request_id: string) => {
    try {
      const response = await fetch("/api/feedback", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          score: rating,
          feedback: "",
          issue_id,
          request_id,
        }),
      })

      if (!response.ok) {
        throw new Error("Network response was not ok")
      }

      const data = await response.json()
      console.log("Feedback sent successfully:", data)
      set({ rated: true, isFeedbackDialogOpen: false })
    } catch (error) {
      console.error("Error sending feedback:", error)
      // 可以在这里添加更多的错误处理逻辑，比如显示错误消息给用户
    }
  },
  sendFeedback: async (
    rating: number,
    feedback: string,
    issue_id: string,
    request_id: string
  ) => {
    try {
      const response = await fetch("/api/feedback", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          score: rating,
          feedback,
          issue_id,
          request_id,
        }),
      })

      if (!response.ok) {
        throw new Error("Network response was not ok")
      }

      const data = await response.json()
      console.log("Feedback sent successfully:", data)
      set({ rated: true, isFeedbackDialogOpen: false })
    } catch (error) {
      console.error("Error sending feedback:", error)
      // 可以在这里添加更多的错误处理逻辑，比如显示错误消息给用户
    }
  },
})
