import { StateCreator } from "zustand"

export interface Issue {
  proposedIssueTitle: string
  proposedIssueDescription: string
  issueId: string | null
  error: string
  errorMessage: string
  isIssueLoading: boolean
  isReviewing: boolean
  responseData: any | null
  retryCountDown: number
  setRetryCountDown: (countDown: number) => void
  setIsReviewing: (isReviewing: boolean) => void
  setProposedIssueTitle: (title: string) => void
  setProposedIssueDescription: (description: string) => void
  setIssueId: (id: string | null) => void
  setIsIssueLoading: (isIssueLoading: boolean) => void
  setResponseData: (data: any | null) => void
  setError: (error: string) => void
  setErrorMessage: (message: string) => void
  initializeIssue: () => void
}

export const createIssueSlice: StateCreator<Issue> = (set) => ({
  proposedIssueTitle: "",
  proposedIssueDescription: "",
  error: "",
  errorMessage: "",
  issueId: null,
  isIssueLoading: false,
  isReviewing: false,
  responseData: null,
  retryCountDown: 0,
  setRetryCountDown: (countDown) => {
    set({ retryCountDown: countDown })
    const interval = setInterval(() => {
      set((state) => {
        if (state.retryCountDown > 0) {
          return { retryCountDown: state.retryCountDown - 1 }
        } else {
          clearInterval(interval) // 倒计时结束，清除定时器
          return { retryCountDown: 0 }
        }
      })
    }, 1000) // 每秒自减1
  },
  setIsReviewing: (isReviewing) => {
    set({ isReviewing })
  },
  setProposedIssueTitle: (title) => {
    localStorage.setItem("proposedIssueTitle", title)
    set({ proposedIssueTitle: title })
  },
  setProposedIssueDescription: (description) => {
    localStorage.setItem("proposedIssueDescription", description)
    set({ proposedIssueDescription: description })
  },
  setIssueId: (id) => set({ issueId: id }),
  setIsIssueLoading: (isIssueLoading) => set({ isIssueLoading }),
  setResponseData: (data) => set({ responseData: data }),
  setError: (error) => set({ error: error }),
  setErrorMessage: (message) => set({ errorMessage: message }),
  initializeIssue: () => {
    if (typeof window !== "undefined") {
      set({
        proposedIssueTitle: localStorage.getItem("proposedIssueTitle") || "",
        proposedIssueDescription:
          localStorage.getItem("proposedIssueDescription") || "",
      })
    }
  },
})
