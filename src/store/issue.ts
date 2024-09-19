import { StateCreator } from "zustand"

export interface Issue {
  proposedIssueTitle: string
  proposedIssueDescription: string
  issueId: string | null
  isIssueLoading: boolean
  error: string | null
  responseData: any | null
  setProposedIssueTitle: (title: string) => void
  setProposedIssueDescription: (description: string) => void
  setIssueId: (id: string | null) => void
  setIsIssueLoading: (isIssueLoading: boolean) => void
  setError: (error: string | null) => void
  setResponseData: (data: any | null) => void
  initializeIssue: () => void
}

export const createIssueSlice: StateCreator<Issue> = (set) => ({
  proposedIssueTitle: "",
  proposedIssueDescription: "",
  issueId: null,
  isIssueLoading: false,
  error: null,
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
  setError: (error) => set({ error }),
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
  // initializeIssue: () => {
  //   set({
  //     proposedIssueTitle: "",
  //     proposedIssueDescription: "",
  //     issueId: null,
  //     isIssueLoading: false,
  //     error: null,
  //     responseData: null,
  //   })
  // },
})
