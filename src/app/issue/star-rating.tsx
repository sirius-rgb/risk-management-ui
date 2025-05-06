"use client"

import React, { useCallback, useEffect, useState } from "react"
import { useStore } from "@/store"
import { debounce } from "lodash"
import { Loader2, Star } from "lucide-react"
import { toast } from "sonner"

import { cn } from "@/lib/utils"

const ratingDescriptions: { [key: number]: string } = {
  0: "No rating yet",
  1: "Significantly Worse",
  2: "Worse",
  3: "Similar",
  4: "Better",
  5: "Significantly Better",
}

const StarRating: React.FC = () => {
  const { requestId } = useStore()

  const {
    score,
    hover_score,
    isSubmitted,
    isLoading,
    setScore,
    setHoverScore,
    resetFeedback,
    submitFeedback,
  } = useStore()

  const [isMounted, setIsMounted] = useState(true)

  useEffect(() => {
    setIsMounted(true)
    return () => setIsMounted(false)
  }, [])

  useEffect(() => {
    if (requestId) {
      resetFeedback()
    }
  }, [requestId, resetFeedback])

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedSubmit = useCallback(
    debounce(async (rating: number) => {
      if (!requestId || !isMounted) return

      try {
        setScore(rating)

        await submitFeedback(requestId, rating, 0, "")

        if (isMounted) {
          toast.success("Rating submitted successfully!")
        }
      } catch (error) {
        console.error("Error submitting feedback:", error)
        if (isMounted) {
          toast.error("Failed to submit feedback")
          setScore(0)
        }
      }
    }, 300),
    [requestId, setScore, submitFeedback, isMounted]
  )

  const handleClick = (newRating: number) => {
    if (isLoading || isSubmitted) return

    debouncedSubmit(newRating)
  }

  const handleMouseEnter = (index: number) => {
    if (isLoading || isSubmitted) return
    setHoverScore(index)
  }

  const handleMouseLeave = () => {
    if (!isLoading && !isSubmitted) {
      setHoverScore(0)
    }
  }

  const displayRating = isSubmitted
    ? score
    : hover_score > 0
      ? hover_score
      : score

  const description = ratingDescriptions[displayRating || 0]

  return (
    <div className="mt-4 flex items-center space-x-4 pl-4">
      <div className={cn("flex", isLoading && "animate-pulse")}>
        {isLoading ? (
          <div className="flex items-center">
            <Loader2 className="mr-2 h-6 w-6 animate-spin text-blue-500" />
            <span className="text-sm text-gray-600 dark:text-gray-300">
              Submitting...
            </span>
          </div>
        ) : (
          [1, 2, 3, 4, 5].map((index) => {
            const isFilled = index <= (displayRating || 0)

            return (
              <Star
                key={index}
                className={cn(
                  "h-6 w-6 transition-colors duration-200",
                  isSubmitted || isLoading
                    ? "pointer-events-none"
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
          })
        )}
      </div>
      <span className="min-w-[200px] text-left text-sm text-gray-600 dark:text-gray-300">
        {isLoading
          ? ""
          : isSubmitted
            ? `${description} (Feedback submitted: ${score}/5)`
            : description}
      </span>
    </div>
  )
}

export default StarRating
