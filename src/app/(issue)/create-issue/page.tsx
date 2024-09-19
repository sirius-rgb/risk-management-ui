"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useStore } from "@/store"
import { toast } from "sonner"
import useSWRMutation from "swr/mutation"

import { useIssueStore } from "@/hooks/useIssueStore"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

interface IssueData {
  issue_title: string
  issue_description: string
}

export default function Page() {
  const router = useRouter()
  const {
    proposedIssueTitle,
    proposedIssueDescription,
    setProposedIssueTitle,
    setProposedIssueDescription,
    setIsIssueLoading,
    setError,
    setResponseData,
    setIssueId,
  } = useStore()

  // 在组件加载时重置 title 和 description
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
      router.push("/create-detail")
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
        className="mb-4 mt-2 min-h-8"
        placeholder="e.g. Inadequate Access Control for Sensitive Data"
        defaultValue={proposedIssueTitle}
        onChange={(e) => setProposedIssueTitle(e.target.value)}
      />

      <Label htmlFor="description">
        Description of the Risk or Control Gaps
      </Label>
      <Textarea
        id="description"
        className="mb-4 mt-2 min-h-64"
        defaultValue={proposedIssueDescription}
        placeholder="e.g. The current access control mechanisms in place for sensitive data within the organization are inadequate, allowing unauthorized personnel to potentially access confidential information. This gap could lead to data breaches, unauthorized data manipulation, and a loss of customer trust. The lack of role-based access controls (RBAC) and periodic access reviews exacerbates this risk, making it imperative to strengthen access policies and implement stricter data governance practices."
        onChange={(e) => setProposedIssueDescription(e.target.value)}
      />
      <Button
        className="mb-4 mt-2 max-h-8 w-full sm:w-96"
        onClick={handleSubmit}
      >
        Create
      </Button>
    </section>
  )
}
