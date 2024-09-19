"use client"

import * as React from "react"
import { useEffect, useState } from "react"
import { useStore } from "@/store"
import useSWR, { mutate } from "swr"

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
} from "@/components/ui/alertDialog"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { SecureTextarea } from "@/components/ui/secureTextarea"
import { Skeleton } from "@/components/ui/skeleton"
import { Textarea } from "@/components/ui/textarea"
import Rating from "@/components/rate"

const fetcher = (url: string) => fetch(url).then((res) => res.json())

const SkeletonTextarea = () => (
  <div className="mb-4 space-y-4">
    <Skeleton className="h-4 w-[100px]" />
    <Skeleton className="h-20 w-full" />
  </div>
)

export default function Page() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { data, error, isLoading } = useSWR("/api/issue", fetcher)

  const proposedIssueTitle = useStore((state) => state.proposedIssueTitle)
  const proposedIssueDescription = useStore(
    (state) => state.proposedIssueDescription
  )
  const setProposedIssueTitle = useStore((state) => state.setProposedIssueTitle)
  const setProposedIssueDescription = useStore(
    (state) => state.setProposedIssueDescription
  )
  const rated = useStore((state) => state.rated)

  const isAcceptTAndC = useStore((state) => state.isAcceptTAndC)
  const setAcceptTAndC = useStore((state) => state.setAcceptTAndC)

  const initializeIssue = useStore((state) => state.initializeIssue)

  useEffect(() => {
    initializeIssue()
  }, [initializeIssue])

  if (error) return <div>Error!</div>

  async function handleReview(): Promise<void> {
    setIsSubmitting(true)
    const response_score = useStore.getState().rating
    const feedback = "test" // 您可能需要从某个输入字段获取实际的反馈内容

    try {
      const response = await fetch("/api/issue", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ response_score, feedback }),
      })

      if (!response.ok) {
        throw new Error("提交反馈失败")
      }

      // 处理成功响应
      console.log("反馈提交成功")

      // 重置评分
      useStore.getState().setRating(0)

      // 清空反馈输入框
      const feedbackTextarea = document.getElementById(
        "feedback"
      ) as HTMLTextAreaElement
      if (feedbackTextarea) {
        feedbackTextarea.value = ""
      }

      // 重新触发 SWR 请求
      await mutate("/api/issue")
    } catch (error) {
      console.error("提交反馈时出错:", error)
      // 可以在这里添加一些错误处理，比如显示一个错误消息
    } finally {
      setIsSubmitting(false)
    }
  }

  // async function handleFeedback(): Promise<void> {
  //   mutate("/api/feedback")
  // }

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
        className="mb-4 mt-2 min-h-8 bg-gray-100"
        defaultValue={proposedIssueTitle}
        onChange={(e) => setProposedIssueTitle(e.target.value)}
        placeholder="Lorem ipsum, dolor sit amet consectetur adipisicing elit. "
      />
      <Label htmlFor="title">Description of the Risk or Control Gaps</Label>
      <Textarea
        id="title"
        rows={1}
        className="mb-4 mt-2 min-h-64 bg-gray-100"
        defaultValue={proposedIssueDescription}
        onChange={(e) => setProposedIssueDescription(e.target.value)}
        placeholder="please provide details of control or risk gaps below"
      />
      {isLoading ? (
        <SkeletonTextarea />
      ) : (
        <>
          <Label htmlFor="title">Revised Issue Title</Label>
          <Textarea
            id="revisedTitle"
            rows={1}
            disabled={!isAcceptTAndC}
            className="mb-4 mt-2 min-h-8 select-none"
            defaultValue={data.data.revised_issue_title}
            placeholder="Lorem ipsum, dolor sit amet consectetur adipisicing elit. "
          />
        </>
      )}
      {isLoading ? (
        <SkeletonTextarea />
      ) : (
        <>
          <Label htmlFor="title">Revised Issue Description</Label>
          <Textarea
            id="revisedDescription"
            rows={1}
            disabled={!isAcceptTAndC}
            className="mb-4 mt-2 min-h-36 select-none"
            defaultValue={data.data.revised_issue_description}
            placeholder="Lorem ipsum, dolor sit amet consectetur adipisicing elit. "
          />
        </>
      )}
      {isLoading ? (
        <SkeletonTextarea />
      ) : (
        <>
          <Label htmlFor="title">Additional Information Needed</Label>
          <SecureTextarea
            id="title"
            rows={1}
            disabled={!isAcceptTAndC}
            defaultValue={data.data.additional_information_needed}
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
          isLoading={isLoading}
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
