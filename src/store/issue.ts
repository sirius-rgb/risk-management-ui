import { StateCreator } from "zustand"

export interface Issue {
  issueLocation: string
  draftIssueTitle: string
  draftIssueDescription: string
  suggestedIssueTitle: string
  suggestedIssueDescription: string
  additionalInformationNeeded: string
  issueId: string | null
  requestId: string | null
  error: string
  errorCode: string
  errorMessage: string
  isIssueLoading: boolean
  isReviewing: boolean
  responseData: any | null
  isRetryModalOpen: boolean
  retryCountDown: number
  retryTimes: number
  setRetryTimes: (times: number) => void
  setErrorCode: (code: string) => void
  setRetryModalOpen: (isRetryModalOpen: boolean) => void
  setRetryCountDown: (countDown: number) => void
  setIsReviewing: (isReviewing: boolean) => void
  setIssueLocation: (location: string) => void
  setDraftIssueTitle: (title: string) => void
  setDraftIssueDescription: (description: string) => void
  setSuggestedIssueTitle: (title: string) => void
  setSuggestedIssueDescription: (description: string) => void
  setAdditionalInformationNeeded: (info: string) => void
  setIssueId: (id: string | null) => void
  setRequestId: (id: string | null) => void
  setIsIssueLoading: (isIssueLoading: boolean) => void
  setResponseData: (data: any | null) => void
  setError: (error: string) => void
  setErrorMessage: (message: string) => void
  initializeIssue: () => void
}

export const createIssueSlice: StateCreator<Issue> = (set) => ({
  issueLocation: "",
  draftIssueTitle: "",
  draftIssueDescription: "",
  suggestedIssueTitle: "",
  suggestedIssueDescription: "",
  additionalInformationNeeded: "",
  error: "",
  errorCode: "0",
  errorMessage: "",
  issueId: null,
  requestId: null,
  isIssueLoading: false,
  isReviewing: false,
  isRetryModalOpen: false,
  responseData: null,
  retryCountDown: Infinity,
  retryTimes: 0,
  setRetryTimes: (times) => {
    set({ retryTimes: times })
  },
  setErrorCode(code) {
    set({ errorCode: code })
  },
  setRetryCountDown: (countDown) => {
    set({ retryCountDown: countDown })
  },
  setRetryModalOpen: (isRetryModalOpen) => {
    set({ isRetryModalOpen })
  },
  setIsReviewing: (isReviewing) => {
    set({ isReviewing })
  },
  setIssueLocation: (location) => {
    set({ issueLocation: location })
  },
  setDraftIssueTitle: (title) => {
    set({ draftIssueTitle: title })
    if (typeof window !== "undefined") {
      localStorage.setItem("draftIssueTitle", title)
    }
  },
  setDraftIssueDescription: (description) => {
    set({ draftIssueDescription: description })
    if (typeof window !== "undefined") {
      localStorage.setItem("draftIssueDescription", description)
    }
  },
  setSuggestedIssueTitle: (title) => {
    set({ suggestedIssueTitle: title })
  },
  setSuggestedIssueDescription: (description) => {
    set({ suggestedIssueDescription: description })
  },
  setAdditionalInformationNeeded: (info) => {
    set({ additionalInformationNeeded: info })
  },
  setIssueId: (id) => set({ issueId: id }),
  setRequestId: (id) => set({ requestId: id }),
  setIsIssueLoading: (isIssueLoading) => set({ isIssueLoading }),
  setResponseData: (data) => set({ responseData: data }),
  setError: (error) => set({ error: error }),
  setErrorMessage: (message) => set({ errorMessage: message }),
  initializeIssue: () => {
    if (typeof window !== "undefined") {
      set({
        draftIssueTitle: localStorage.getItem("draftIssueTitle") || "",
        draftIssueDescription:
          localStorage.getItem("draftIssueDescription") || "",
      })
    }
  },
})
