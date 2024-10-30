"use client"

import { useEffect, useState } from "react"
import { useStore } from "@/store"
import { toast } from "sonner"

import { issue_description, issue_title } from "@/lib/conts"
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
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

const TITLE_MAX_LENGTH = 50
const DESCRIPTION_MAX_LENGTH = 50

export function CreateIssuePage() {
  const {
    proposedIssueTitle,
    proposedIssueDescription,
    isIssueLoading,
    setProposedIssueTitle,
    setProposedIssueDescription,
    setIsIssueLoading,
    setResponseData,
    setIssueId,
  } = useStore()

  const [titleLengthExceeded, setTitleLengthExceeded] = useState(false)
  const [descriptionLengthExceeded, setDescriptionLengthExceeded] =
    useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)

  useEffect(() => {
    const handleBeforeUnload = () => {
      setIsLoading(true)
    }

    const handleLoad = () => {
      setIsLoading(false)
    }

    window.addEventListener("beforeunload", handleBeforeUnload)
    window.addEventListener("load", handleLoad)

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload)
      window.removeEventListener("load", handleLoad)
    }
  }, [])

  useEffect(() => {
    setProposedIssueTitle("")
    setProposedIssueDescription("")
    setIssueId(null)
    setResponseData(null)
  }, [
    setProposedIssueTitle,
    setProposedIssueDescription,
    setIssueId,
    setResponseData,
  ])

  useEffect(() => {
    return () => {
      toast.dismiss()
    }
  }, [])

  const handleTitleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value
    setProposedIssueTitle(value)
    setTitleLengthExceeded(value.length > TITLE_MAX_LENGTH)
  }

  const handleDescriptionChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const value = e.target.value
    setProposedIssueDescription(value)
    setDescriptionLengthExceeded(value.length > DESCRIPTION_MAX_LENGTH)
  }

  const handleSubmit = async () => {
    if (!proposedIssueTitle.trim()) {
      toast.error("Please enter the issue title")
      return
    }

    if (!proposedIssueDescription.trim()) {
      toast.error("Please enter the issue description")
      return
    }

    if (titleLengthExceeded || descriptionLengthExceeded) {
      toast.error(
        "Please ensure that title and description are within the length limits."
      )
      return
    }

    setIsLoading(true)
    try {
      const response = await fetch("/api/issue", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          issue_title: proposedIssueTitle,
          issue_description: proposedIssueDescription,
        }),
      })

      if (!response.ok) {
        const errorResponse = await response.json()
        console.log("errorData", errorResponse)
        throw new Error(errorResponse.message)
      }

      const data = await response.json()
      setResponseData(data)
      setIssueId(data.data.issue_id)
    } catch (error: any) {
      console.error("create issue error:", error)
      toast.error(`${error.message}`, {
        duration: Infinity,
        dismissible: true,
      })
      setIsModalOpen(true)
    } finally {
      setIsLoading(false)
    }
  }
  const handleRetry = async () => {
    setIsModalOpen(false)
    await handleSubmit()
  }

  const handleCancel = () => {
    setIsModalOpen(false)
  }

  return (
    <section className="m-auto mt-4 p-8 sm:px-16">
      <h2 className="my-4 text-4xl font-semibold text-gray-900 dark:text-white">
        Issue Creation
      </h2>
      <Label htmlFor="title">{issue_title}</Label>
      <Textarea
        id="title"
        rows={1}
        className="my-4 min-h-8"
        onChange={handleTitleChange}
        disabled={isLoading}
      />
      {titleLengthExceeded && (
        <p className="pb-2 text-sm text-red-500">
          Title exceeds maximum length of {TITLE_MAX_LENGTH} characters.
        </p>
      )}

      <Label htmlFor="description">{issue_description}</Label>
      <Textarea
        id="description"
        className="mb-4 mt-2 min-h-64"
        onChange={handleDescriptionChange}
        disabled={isLoading}
      />
      {descriptionLengthExceeded && (
        <p className="pb-2 text-sm text-red-500">
          Description exceeds maximum length of {DESCRIPTION_MAX_LENGTH}{" "}
          characters.
        </p>
      )}

      <Button
        className="mb-4 mt-2 max-h-8 w-full sm:w-96"
        onClick={handleSubmit}
        disabled={isLoading}
      >
        {isLoading ? "Creating Issue..." : "Create"}
      </Button>

      {/* 模态窗口 */}
      <AlertDialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Error</AlertDialogTitle>
            <AlertDialogDescription>
              {"An error occurred while creating the issue."}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction onClick={handleRetry}>Retry</AlertDialogAction>
            <AlertDialogCancel onClick={handleCancel}>Cancel</AlertDialogCancel>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </section>
  )
}
