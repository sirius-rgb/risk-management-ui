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

//   if (!response.ok) {
//     const errorData = await response.json()

//     throw new Error(errorData.message)
//   }

//   return response.json()
// }

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
    buttonType: "retry",
  },
}

// export const errorMapping = {
//   400: { error: "Bad Request", description: "Invalid input provided.", buttonType: "ok" },
//   403: { error: "Forbidden", description: "You do not have permission.", buttonType: "ok" },
//   429: { error: "Too Many Requests", description: "Please wait and try again.", buttonType: "retry" },
//   500: { error: "Server Error", description: "Internal server error occurred.", buttonType: "retry" },
// }
