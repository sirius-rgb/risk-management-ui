"use client"

import React, { useEffect, useState } from "react"
import { Star } from "lucide-react"

import { cn } from "@/lib/utils"
import { useFeedback } from "@/hooks/useFeedback"

interface StarRatingProps {
  initialRating?: number
  onRatingChange?: (rating: number) => void
  requestId?: string | null // To detect when the request changes/reruns
}

const ratingDescriptions: { [key: number]: string } = {
  0: "No rating yet",
  1: "Significantly Worse",
  2: "Worse",
  3: "Similar",
  4: "Better",
  5: "Significantly Better",
}

const StarRating: React.FC<StarRatingProps> = ({
  initialRating = 0,
  onRatingChange,
  requestId,
}) => {
  // Use our feedback hook instead of local state
  const {
    submitFeedback,
    resetFeedback,
    isSubmitted,
    currentScore,
    isLoading,
  } = useFeedback()

  // Local state for hover effects
  const [hoverRating, setHoverRating] = useState<number>(0)

  // Add local state to track submitted rating for UI display
  const [submittedRating, setSubmittedRating] = useState<number | null>(null)

  // Reset feedback when requestId changes (user reruns the request)
  useEffect(() => {
    if (requestId) {
      resetFeedback()
      setSubmittedRating(null) // Reset our local state too
    }
  }, [requestId, resetFeedback])

  // Update local state when currentScore changes
  useEffect(() => {
    if (currentScore !== null) {
      setSubmittedRating(currentScore)
    }
  }, [currentScore])

  const handleClick = async (newRating: number) => {
    // If already submitted, do nothing
    if (isSubmitted) return

    // Submit the feedback
    const result = await submitFeedback(newRating)

    if (result.success) {
      // Update our local state immediately for UI feedback
      setSubmittedRating(newRating)
      if (onRatingChange) {
        onRatingChange(newRating)
      }
    }
  }

  const handleMouseEnter = (index: number) => {
    // Only allow hover effects if not submitted
    if (!isSubmitted) {
      setHoverRating(index)
    }
  }

  const handleMouseLeave = () => {
    setHoverRating(0)
  }

  // Determine the current display rating with clear priority
  const displayRating =
    // If submitted, show the submitted rating
    isSubmitted
      ? submittedRating || currentScore || 0
      : // If hovering, show the hover rating
        hoverRating > 0
        ? hoverRating
        : // Otherwise show initial rating (likely 0)
          initialRating

  const description = ratingDescriptions[displayRating]

  return (
    <div className="mt-4 flex items-center space-x-4 pl-4">
      <div className="flex">
        {[1, 2, 3, 4, 5].map((index) => {
          // Use submittedRating directly for visual feedback if available
          const isFilled =
            index <= (isSubmitted ? submittedRating || 0 : displayRating)

          return (
            <Star
              key={index}
              className={cn(
                "h-6 w-6",
                isSubmitted
                  ? "pointer-events-none" // Remove pointer events when submitted
                  : "cursor-pointer",
                isFilled
                  ? "fill-yellow-400 text-yellow-400"
                  : "text-gray-300 hover:text-yellow-200"
              )}
              onClick={() => handleClick(index)}
              onMouseEnter={() => handleMouseEnter(index)}
              onMouseLeave={handleMouseLeave}
            />
          )
        })}
      </div>
      <span className="min-w-[200px] text-left text-sm text-gray-600 dark:text-gray-300">
        {isLoading ? "Submitting feedback..." : description}
        {isSubmitted && " (Feedback submitted)"}
      </span>
    </div>
  )
}

export default StarRating
