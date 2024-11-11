import { Feedback, Issue } from "@/types"

export const fetcher = (url: string) => fetch(url).then((res) => res.json())

export const issueFetcher = (url: string, { arg }: { arg: Issue }) =>
  fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(arg),
  }).then((res) => res.json())

export const feedbackFetcher = (url: string, { arg }: { arg: Feedback }) =>
  fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(arg),
  }).then((res) => res.json())

export const errorMapping: {
  [key: number | string]: {
    error: string
    description: string
    buttonType: "ok" | "retry"
    retryCountdown?: number
    retrtTimeout?: number
    retryAttempts?: number
  }
} = {
  400: {
    error: "Bad Request",
    description:
      "Your session has timeout due to inactivity. Please login again to continue.",
    buttonType: "ok",
  },
  403: {
    error: "Session Expired",
    description:
      "Your session has timeout due to inactivity. Please login again to continue.",
    buttonType: "ok",
  },
  4029: {
    error: "LLM Rate Limit Exceeded",
    description: "There are too many requests in a short period.",
    buttonType: "retry",
  },
  5000: {
    error: "Request Timeout",
    description:
      "We have attempted to process your request multiple times, but it was unsuccessful.",
    retryCountdown: 5,
    retrtTimeout: 90,
    retryAttempts: 0,
    buttonType: "retry",
  },
  5004: {
    error: "Bad Gateway",
    description:
      "We're having trouble connecting to the server. The system is automatically retrying.",
    retryCountdown: 5,
    retrtTimeout: 90,
    retryAttempts: 0,
    buttonType: "retry",
  },
}

const calculateRetryTimeout = (attempt: number): number => {
  switch (attempt) {
    case 0:
      return 90
    case 1:
      return 120
    case 2:
      return 150
    case 3:
      return 180
    default:
      return 90
  }
}
