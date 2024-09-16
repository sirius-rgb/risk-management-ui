import { StateCreator } from "zustand"

export interface Issue {
  proposedIssueTitle: string
  proposedIssueDescription: string
  setProposedIssueTitle: (title: string) => void
  setProposedIssueDescription: (description: string) => void
  initializeIssue: () => void
}

export const createIssueSlice: StateCreator<Issue> = (set) => ({
  proposedIssueTitle: "",
  proposedIssueDescription: "",
  setProposedIssueTitle: (title) => {
    localStorage.setItem("proposedIssueTitle", title)
    set({ proposedIssueTitle: title })
  },
  setProposedIssueDescription: (description) => {
    localStorage.setItem("proposedIssueDescription", description)
    set({ proposedIssueDescription: description })
  },
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
