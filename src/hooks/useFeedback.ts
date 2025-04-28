import { useState } from "react"
import useSWRMutation from "swr/mutation"
import { v4 as uuidv4 } from "uuid" // You'll need to install this: npm install uuid @types/uuid

interface FeedbackRequest {
  id: string
  score: number
}

interface FeedbackResponse {
  status: string
  message: string
}

/**
 * Fetcher function to handle feedback submission
 */
async function submitFeedbackFetcher(
  url: string,
  { arg }: { arg: FeedbackRequest }
): Promise<FeedbackResponse> {
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(arg),
  })

  if (!response.ok) {
    throw new Error(`HTTP error: ${response.status}`)
  }

  return await response.json()
}

/**
 * Hook for submitting feedback
 */
export function useFeedback() {
  const [feedbackId] = useState(() => uuidv4()) // Generate a random ID once
  const [submitted, setSubmitted] = useState(false)
  const [currentScore, setCurrentScore] = useState<number | null>(null)

  const { trigger, data, error, isMutating } = useSWRMutation(
    "http://localhost:8000/api/feedback",
    submitFeedbackFetcher
  )

  /**
   * Submit a feedback score
   */
  const submitFeedback = async (score: number) => {
    if (submitted) {
      return { success: false, message: "Feedback already submitted" }
    }

    if (score < 1 || score > 5) {
      return { success: false, message: "Score must be between 1 and 5" }
    }

    try {
      await trigger({ id: feedbackId, score })
      setSubmitted(true)
      setCurrentScore(score)
      return { success: true }
    } catch (error) {
      console.error("Error submitting feedback:", error)
      return { success: false, message: "Failed to submit feedback" }
    }
  }

  /**
   * Reset the feedback state
   */
  const resetFeedback = () => {
    setSubmitted(false)
    setCurrentScore(null)
  }

  return {
    submitFeedback,
    resetFeedback,
    isSubmitted: submitted,
    currentScore,
    isLoading: isMutating,
    error,
  }
}
