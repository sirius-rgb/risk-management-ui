"use client"

import * as React from "react"
import { useEffect, useState } from "react"
import { useStore } from "@/store"
import { toast } from "sonner"
import useSWRMutation from "swr/mutation"

import { errorMapping, issueFetcher } from "@/lib/api"
import {
  additional_information_needed,
  issue_description,
  issue_title,
  statement,
  suggessted_issue_description,
  suggessted_issue_title,
} from "@/lib/conts"
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
import FeedbackDialog from "@/app/(issue)/issue/(components)/feedbackDialog"
import PageTitle from "@/app/(issue)/issue/(components)/PageTitle"
import StartRating from "@/app/(issue)/issue/(components)/StartRate"

import RetryModal from "../(components)/RetryModal"

const SkeletonTextarea = () => (
  <div className="mb-4 space-y-4">
    <Skeleton className="h-4 w-[100px] animate-pulse bg-gray-300 dark:bg-gray-600" />
    <Skeleton className="h-20 w-full animate-pulse bg-gray-300 dark:bg-gray-600" />
  </div>
)

export function IssueDetailPage() {
  const {
    proposedIssueTitle,
    proposedIssueDescription,
    issueId,
    rated,
    isAcceptTAndC,
    error,
    errorMessage,
    isReviewing,
    setIsReviewing,
    setProposedIssueTitle,
    setProposedIssueDescription,
    setResponseData,
    setIssueId,
    setRating,
    setRated,
    setError,
    setErrorMessage,
    setAcceptTAndC,
    initializeIssue,
  } = useStore()
  const { trigger, isMutating } = useSWRMutation("/api/issue", issueFetcher)
  const [isModalOpen, setIsModalOpen] = useState(false)
  useEffect(() => {
    initializeIssue()
  }, [initializeIssue])

  useEffect(() => {
    return () => {
      toast.dismiss()
    }
  }, [])

  async function handleReview(signal?: AbortSignal): Promise<void> {
    setIsReviewing(true)
    setAcceptTAndC(false)
    setRating(0)
    setRated(false)

    try {
      const result = await trigger({
        issue_id: issueId || undefined,
        issue_title: proposedIssueTitle,
        issue_description: proposedIssueDescription,
      })

      console.log("result", result)

      if (result && result.data) {
        setResponseData(result)
        setIssueId(result.data.issue_id)
      }

      if (result && result.status === "fail") {
        setError(errorMapping[result.code].error)
        setErrorMessage(errorMapping[result.code].description)
        throw new Error(result.message)
      }
    } catch (error: any) {
      console.error("review issue error:", error)
      toast.error(`${error.message}`, {
        duration: Infinity,
        dismissible: true,
      })
      setIsModalOpen(true)
    } finally {
      setIsReviewing(false)
    }
  }

  // const handleRetry = async () => {
  //   // setIsModalOpen(false)
  //   toast.dismiss()
  //   const controller = new AbortController()

  //   let countdown = 10 // 倒计时10秒
  //   const interval = setInterval(() => {
  //     if (countdown > 0) {
  //       toast.loading(`Retrying... ${countdown}秒`, { id: "retry" })
  //       countdown--
  //     } else {
  //       clearInterval(interval)
  //     }
  //   }, 1000)

  //   await handleReview()

  //   // 请求完成后清除倒计时
  //   clearInterval(interval)
  //   toast.dismiss("retry")
  // }

  const handleRetry = async () => {
    toast.dismiss()
    const controller = new AbortController() // 创建一个新的 AbortController

    let countdown = 10 // 倒计时10秒
    const toastId = toast.loading(`Retrying... ${countdown}秒`, {
      action: {
        label: "Cancel",
        onClick: () => {
          controller.abort() // 取消请求
          toast.dismiss(toastId) // 关闭 toast
          // setIsModalOpen(false)
        },
      },
    })

    const interval = setInterval(() => {
      if (countdown > 0) {
        countdown--
        // toast.update(toastId, {
        //   render: `Retrying... ${countdown}秒`,
        // })
      } else {
        clearInterval(interval)
      }
    }, 1000)

    try {
      await handleReview(controller.signal) // 传递信号
    } catch (error) {
      // 处理错误
    } finally {
      clearInterval(interval)
      toast.dismiss(toastId) // 关闭 toast
      // setAbortController(null) // 清除控制器
    }
  }
  const handleCancel = () => {
    setIsModalOpen(false)
  }

  return (
    <section className="m-auto mt-8 p-8 sm:px-16">
      <PageTitle title={"Issue Creation"} />
      <Label htmlFor="title">{issue_title}</Label>
      <Textarea
        id="title"
        rows={1}
        className="mb-4 mt-2 min-h-8 bg-gray-100 dark:bg-zinc-700"
        defaultValue={proposedIssueTitle}
        onChange={(e) => setProposedIssueTitle(e.target.value)}
        placeholder="please type Proposed Issue Title here"
      />
      <Label htmlFor="title">{issue_description}</Label>
      <Textarea
        id="title"
        rows={1}
        className="mb-4 mt-2 min-h-64 bg-gray-100 dark:bg-zinc-700"
        defaultValue={proposedIssueDescription}
        onChange={(e) => setProposedIssueDescription(e.target.value)}
        placeholder="please provide details of control or risk gaps below"
      />
      {isMutating ? <LoadingTextArea /> : <Area />}
      <StartRating />
      <TermsAndConditions />

      <div className="mt-4 flex flex-col space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
        <Button
          className="h-8 w-full"
          // disabled={!(isAcceptTAndC && rated) || isReviewing}
          onClick={handleReview}
        >
          {isReviewing ? "Reviewing..." : "Review Again"}
        </Button>
        <FeedbackDialog isLoading={isMutating} />
        <RetryModal
          autoRetry={20}
          error={error}
          errorDescription={errorMessage}
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          handleRetry={handleRetry}
          handleCancel={handleCancel}
        />
      </div>
    </section>
  )
}

const LoadingTextArea = () => {
  return (
    <>
      <SkeletonTextarea />
      <SkeletonTextarea />
      <SkeletonTextarea />
    </>
  )
}

const Area = () => {
  const isAcceptTAndC = useStore((state) => state.isAcceptTAndC)
  const rated = useStore((state) => state.rated)
  const responseData = useStore((state) => state.responseData)
  return (
    <>
      <Label htmlFor="title">{suggessted_issue_title}</Label>
      <Textarea
        id="revisedTitle"
        rows={1}
        disabled={!(isAcceptTAndC && rated)}
        className="mb-4 mt-2 min-h-8 select-none"
        defaultValue={responseData?.data?.revised_issue_title || ""}
        placeholder="Lorem ipsum, dolor sit amet consectetur adipisicing elit. "
      />

      <Label htmlFor="title">{suggessted_issue_description}</Label>
      <Textarea
        id="revisedDescription"
        rows={1}
        disabled={!(isAcceptTAndC && rated)}
        className="mb-4 mt-2 min-h-36 select-none"
        defaultValue={responseData?.data?.revised_issue_description || ""}
        placeholder="Lorem ipsum, dolor sit amet consectetur adipisicing elit. "
      />

      <Label htmlFor="title">{additional_information_needed}</Label>
      <SecureTextarea
        id="title"
        rows={1}
        disabled={!(isAcceptTAndC && rated)}
        defaultValue={responseData?.data?.additional_information_needed || ""}
        className="mb-4 mt-2 min-h-32"
        placeholder={`The LLM will generate the additional information needed for the issue creation`}
      />
    </>
  )
}

const TermsAndConditions = () => {
  const setAcceptTAndC = useStore((state) => state.setAcceptTAndC)
  const isAcceptTAndC = useStore((state) => state.isAcceptTAndC)
  const isReviewing = useStore((state) => state.isReviewing)
  return (
    <AlertDialog>
      <div className="my-2 flex flex-col items-center justify-center space-y-2 sm:flex-row sm:justify-start sm:space-x-2 sm:space-y-0">
        <AlertDialogTrigger asChild>
          <Checkbox id="terms" checked={isAcceptTAndC} disabled={isReviewing} />
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
          <AlertDialogTitle className="rounded-t border-b py-2 text-red-600 dark:border-gray-600">
            Terms and condition
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
  )
}
