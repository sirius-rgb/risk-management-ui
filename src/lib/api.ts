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
  [key: number]: { error: string; description: string }
} = {
  403: {
    error: "Session Expired",
    description:
      "Your session has timeout due to inactivity. Please login again to continue.",
  },
  4029: {
    error: "LLM Rate Limit Exceeded",
    description: "There are too many requests in a short period.",
  },
  5000: {
    error: "Request Timeout",
    description:
      "We have attempted to process your request multiple times, but it was unsuccessful.",
  },
}
