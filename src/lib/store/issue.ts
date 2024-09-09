import { StateCreator } from "zustand"

export interface Issue {
  proposedIssueTitle: string
  proposedIssueDescription: string
  setProposedIssueTitle: (title: string) => void
  setProposedIssueDescription: (description: string) => void
}

export const createIssueSlice: StateCreator<Issue> = (set) => ({
  proposedIssueTitle: "",
  proposedIssueDescription: "",
  setProposedIssueTitle: (title) => set({ proposedIssueTitle: title }),
  setProposedIssueDescription: (description) =>
    set({ proposedIssueDescription: description }),
})
