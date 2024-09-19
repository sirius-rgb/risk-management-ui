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
