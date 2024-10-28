import { StateCreator } from "zustand"

export interface Issue {
  proposedIssueTitle: string
  proposedIssueDescription: string
  issueId: string | null
  isIssueLoading: boolean
  isReviewing: boolean
  setIsReviewing: (isReviewing: boolean) => void
  responseData: any | null
  setProposedIssueTitle: (title: string) => void
  setProposedIssueDescription: (description: string) => void
  setIssueId: (id: string | null) => void
  setIsIssueLoading: (isIssueLoading: boolean) => void
  setResponseData: (data: any | null) => void
  initializeIssue: () => void
}

export const createIssueSlice: StateCreator<Issue> = (set) => ({
  proposedIssueTitle: "",
  proposedIssueDescription: "",
  issueId: null,
  isIssueLoading: false,
  isReviewing: false,
  setIsReviewing: ( isReviewing) => {
    set({ isReviewing })
  },
  responseData: null,
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
