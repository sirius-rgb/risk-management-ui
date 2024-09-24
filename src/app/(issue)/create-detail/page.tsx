"use client"

import * as React from "react"
import { useEffect, useState } from "react"
import { useStore } from "@/store"
import useSWR, { mutate } from "swr"
import useSWRMutation from "swr/mutation"

import { issueFetcher } from "@/lib/api"
import { statement } from "@/lib/conts"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { SecureTextarea } from "@/components/ui/secureTextarea"
import { Skeleton } from "@/components/ui/skeleton"
import { Textarea } from "@/components/ui/textarea"
import Rating from "@/components/rate"

const SkeletonTextarea = () => (
  <div className="mb-4 space-y-4">
    <Skeleton className="h-4 w-[100px]" />
    <Skeleton className="h-20 w-full" />
  </div>
)

export default function Page() {
  const {
    proposedIssueTitle,
    proposedIssueDescription,
    issueId,
    rated,
    isIssueLoading,
    isAcceptTAndC,
    error,
    responseData,
    setProposedIssueTitle,
    setProposedIssueDescription,
    setIsIssueLoading,
    setError,
    setResponseData,
    setIssueId,
    setRating,
    setAcceptTAndC,
    initializeIssue,
  } = useStore()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { trigger, isMutating } = useSWRMutation("/api/issue", issueFetcher)

  useEffect(() => {
    initializeIssue()
  }, [initializeIssue])

  if (error) return <div>Error!</div>

  async function handleReview(): Promise<void> {
    setIsSubmitting(true)
    setAcceptTAndC(false)
    setRating(0)
    try {
      const result = await trigger({
        issue_id: issueId || undefined,
        issue_title: proposedIssueTitle,
        issue_description: proposedIssueDescription,
      })
      setIsIssueLoading(true)
      if (result && result.data) {
        setResponseData(result)
        setIssueId(result.data.issue_id)
      }
    } catch (error) {
      console.error("review issue error:", error)
      setError("There was an error when reviewing the issue. Please try again.")
    } finally {
      setIsSubmitting(false)
      setIsIssueLoading(false)
    }
  }

  return (
    <section className="m-auto mt-8 p-8 sm:px-16">
      <h2 className="text-4xl  font-semibold text-gray-900 dark:text-white">
        Issue Creation
      </h2>
      <p className="my-3 text-sm text-gray-400">
        Please Provide Details of Control or Risk Gaps Below
      </p>
      <Label htmlFor="title">Proposed Issue Title</Label>
      <Textarea
        id="title"
        rows={1}
        className="mb-4 mt-2 min-h-8 bg-gray-100 dark:bg-zinc-700"
        defaultValue={proposedIssueTitle}
        onChange={(e) => setProposedIssueTitle(e.target.value)}
        placeholder="please type Proposed Issue Title here"
      />
      <Label htmlFor="title">Description of the Risk or Control Gaps</Label>
      <Textarea
        id="title"
        rows={1}
        className="mb-4 mt-2 min-h-64 bg-gray-100 dark:bg-zinc-700"
        defaultValue={proposedIssueDescription}
        onChange={(e) => setProposedIssueDescription(e.target.value)}
        placeholder="please provide details of control or risk gaps below"
      />
      {isMutating ? (
        <SkeletonTextarea />
      ) : (
        <>
          <Label htmlFor="title">Revised Issue Title</Label>
          <Textarea
            id="revisedTitle"
            rows={1}
            disabled={!isAcceptTAndC}
            className="mb-4 mt-2 min-h-8 select-none"
            defaultValue={responseData?.data?.revised_issue_title || ""}
            placeholder="Lorem ipsum, dolor sit amet consectetur adipisicing elit. "
          />
        </>
      )}
      {isMutating ? (
        <SkeletonTextarea />
      ) : (
        <>
          <Label htmlFor="title">Revised Issue Description</Label>
          <Textarea
            id="revisedDescription"
            rows={1}
            disabled={!isAcceptTAndC}
            className="mb-4 mt-2 min-h-36 select-none"
            defaultValue={responseData?.data?.revised_issue_description || ""}
            placeholder="Lorem ipsum, dolor sit amet consectetur adipisicing elit. "
          />
        </>
      )}
      {isMutating ? (
        <SkeletonTextarea />
      ) : (
        <>
          <Label htmlFor="title">Additional Information Needed</Label>
          <SecureTextarea
            id="title"
            rows={1}
            disabled={!isAcceptTAndC}
            defaultValue={
              responseData?.data?.additional_information_needed || ""
            }
            className="mb-4 mt-2 min-h-32"
            placeholder={`The LLM will generate the additional information needed for the issue creation`}
          />
        </>
      )}
      <Rating />

      <div>
        <AlertDialog>
          <div className="my-2 flex flex-col items-center justify-center space-y-2 sm:flex-row sm:justify-start sm:space-x-2 sm:space-y-0">
            <AlertDialogTrigger asChild>
              <Checkbox id="terms" checked={isAcceptTAndC} />
            </AlertDialogTrigger>
            <label
              htmlFor="terms"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Accept terms and conditions
            </label>
          </div>

          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle className="rounded-t border-b p-2 dark:border-gray-600">
                Are you absolutely sure?
              </AlertDialogTitle>
              <AlertDialogDescription className="rounded-tp-2">
                {statement}
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel onClick={() => setAcceptTAndC(true)}>
                I accept
              </AlertDialogCancel>
              <AlertDialogAction onClick={() => setAcceptTAndC(false)}>
                Cancel
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>

      <div className="mt-4 flex flex-col space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
        <Button
          className="h-8 w-full"
          disabled={!(isAcceptTAndC && rated) || isSubmitting}
          onClick={handleReview}
        >
          {isSubmitting ? "Reviewing..." : "Review Again"}
        </Button>
        <Feedback
          isLoading={isMutating}
          rating={useStore((state) => state.rating)}
        />
      </div>
    </section>
  )
}

const Feedback = ({
  isLoading,
  rating,
}: {
  isLoading: boolean
  rating: number
}) => {
  const isFeedbackDialogOpen = useStore((state) => state.isFeedbackDialogOpen)
  const setFeedbackDialogOpen = useStore((state) => state.setFeedbackDialogOpen)

  function handleFeedbackSubmit(): void {
    console.log("feedback submitted")
    setFeedbackDialogOpen(false)
  }

  return (
    <AlertDialog
      open={isFeedbackDialogOpen}
      onOpenChange={setFeedbackDialogOpen}
    >
      <AlertDialogTrigger asChild>
        <Button
          variant="destructive"
          className="h-8 w-full"
          disabled={isLoading}
        >
          Copliot Output is Erratic
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="rounded-tp-2">
            Rate the output results of the RM-Copilot.
          </AlertDialogTitle>
          <AlertDialogDescription className="rounded-tp-2"></AlertDialogDescription>
          Quality of the output: <Rating />
        </AlertDialogHeader>
        <Textarea
          id="feedback"
          rows={1}
          className="mb-4 mt-2 min-h-32"
          placeholder="Please provide your feedback here!"
        />
        <AlertDialogFooter>
          <AlertDialogCancel onClick={handleFeedbackSubmit}>
            Send
          </AlertDialogCancel>
          <AlertDialogAction onClick={() => setFeedbackDialogOpen(false)}>
            Cancel
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
