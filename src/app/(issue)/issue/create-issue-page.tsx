"use client"

import { useEffect } from "react"
import { useStore } from "@/store"
import { toast } from "sonner"

import { issue_description, issue_title } from "@/lib/conts"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

export function CreateIssuePage() {
  const {
    proposedIssueTitle,
    proposedIssueDescription,
    isIssueLoading,
    setProposedIssueTitle,
    setProposedIssueDescription,
    setIsIssueLoading,
    setError,
    setResponseData,
    setIssueId,
  } = useStore()

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

  const handleSubmit = async () => {
    if (!proposedIssueTitle.trim()) {
      toast.error("Please enter the issue title")
      return
    }

    if (!proposedIssueDescription.trim()) {
      toast.error("Please enter the issue description")
      return
    }
    setIsIssueLoading(true)
    setError(null)
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
        throw new Error("Failed to create issue")
      }
      const data = await response.json()

      setResponseData(data)
      setIssueId(data.data.issue_id)
    } catch (error) {
      console.error("create issue error:", error)
      setError("There was an error when creating the issue. Please try again.")
      toast.error(
        "There was an error when creating the issue. Please try again."
      )
    } finally {
      setIsIssueLoading(false)
    }
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
        onChange={(e) => setProposedIssueTitle(e.target.value)}
      />

      <Label htmlFor="description">{issue_description}</Label>
      <Textarea
        id="description"
        className="mb-4 mt-2 min-h-64"
        onChange={(e) => setProposedIssueDescription(e.target.value)}
      />
      <Button
        className="mb-4 mt-2 max-h-8 w-full sm:w-96"
        onClick={handleSubmit}
        disabled={isIssueLoading ? true : false}
      >
        {isIssueLoading ? "Creating Issue..." : "Create"}
      </Button>
    </section>
  )
}
