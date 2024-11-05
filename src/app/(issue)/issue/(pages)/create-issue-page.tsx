"use client"

import { useEffect, useState } from "react"
import { useStore } from "@/store"
import { toast } from "sonner"

import { errorMapping } from "@/lib/api"
import CreateIssueButton from "@/app/(issue)/issue/(components)/CreateIssueButton"
import PageTitle from "@/app/(issue)/issue/(components)/PageTitle"
import RetryModal from "@/app/(issue)/issue/(components)/RetryModal"
import TextareaWithCopy from "@/app/(issue)/issue/(components)/TextareaWithCopy"
import Loading from "@/app/(issue)/issue/loading"

export function CreateIssuePage() {
  const {
    proposedIssueTitle,
    proposedIssueDescription,
    error,
    errorMessage,
    retryCountDown,
    setProposedIssueTitle,
    setProposedIssueDescription,
    setError,
    setErrorMessage,
    setRated,
    setRating,
    setAcceptTAndC,
    setResponseData,
    setIssueId,
    setRetryCountDown,
  } = useStore()

  const [titleLengthExceeded, setTitleLengthExceeded] = useState(false)
  const [descriptionLengthExceeded, setDescriptionLengthExceeded] =
    useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)

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
  }

  const handleDescriptionChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const value = e.target.value
    setProposedIssueDescription(value)
  }

  const handleSubmit = async () => {
    resetCheckStatus()
    setIsLoading(true)
    let countdown = 0

    if (!proposedIssueTitle.trim()) {
      toast.warning("Please enter the issue title")
      return
    }

    if (!proposedIssueDescription.trim()) {
      toast.warning("Please enter the issue description")
      return
    }
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
        if (errorResponse.code === 4029) {
          const match = errorResponse.message.match(/(\d+)s/)
          countdown = match ? parseInt(match[1], 10) : 10
        }
        setError(errorMapping[errorResponse.code].error)
        setErrorMessage(errorMapping[errorResponse.code].description)
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
      setRetryCountDown(countdown)
      setIsModalOpen(true)
    } finally {
      setIsLoading(false)
    }
  }

  const resetCheckStatus = () => {
    setRated(false)
    setRating(0)
    setAcceptTAndC(false)
  }

  return (
    <section className="m-auto mt-4 p-8 sm:px-16">
      <PageTitle title={"Issue Creation"} />
      <TextareaWithCopy
        id={"title"}
        label={"Draft Issue Title"}
        rows={1}
        handleChange={handleTitleChange}
        defaultValue={""}
        maxLength={10}
        isLoading={isLoading}
        isLengthExceeded={titleLengthExceeded}
        className="my-4 min-h-16"
      />
      <TextareaWithCopy
        id={"description"}
        label={"Draft Issue Description"}
        rows={1}
        handleChange={handleDescriptionChange}
        defaultValue={""}
        maxLength={20}
        isLoading={isLoading}
        isLengthExceeded={descriptionLengthExceeded}
        className="my-4 min-h-32"
      />
      <CreateIssueButton
        isLoading={isLoading}
        handleSubmit={handleSubmit}
        loadingName={"Loading..."}
        loadedName={"Create"}
      />
      {isLoading && <Loading />}
      <RetryModal
        errorDescription={errorMessage}
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
      />
    </section>
  )
}
