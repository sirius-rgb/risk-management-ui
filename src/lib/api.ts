import { Feedback, Issue } from "@/types"

export const fetcher = (url: string) => fetch(url).then((res) => res.json())

export const issueFetcher = async (url: string, { arg }: { arg: any }) => {
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(arg),
  })

  if (!response.ok) {
    const errorData = await response.json()
    throw new Error(errorData.message)
  }

  return response.json()
}

export const feedbackFetcher = (url: string, { arg }: { arg: Feedback }) =>
  fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(arg),
  }).then((res) => res.json())
