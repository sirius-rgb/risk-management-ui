import { StateCreator } from "zustand"

export interface IssueSlice {
  proposedIssueTitle: string
  proposedIssueDescription: string
  setProposedIssueTitle: (title: string) => void
  setProposedIssueDescription: (description: string) => void
}

export const createIssueSlice: StateCreator<IssueSlice> = (set) => ({
  proposedIssueTitle: "111",
  proposedIssueDescription: "222",
  setProposedIssueTitle: (title) => set({ proposedIssueTitle: title }),
  setProposedIssueDescription: (description) =>
    set({ proposedIssueDescription: description }),
})
