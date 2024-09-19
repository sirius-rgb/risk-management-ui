"use client"

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
  const fetcher = (url: string, { arg }: { arg: IssueData }) =>
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(arg),
    }).then((res) => res.json())

  const { trigger } = useSWRMutation<any, Error, string, IssueData>(
    "https://www.example.com/v1/chat/general_chat",
    fetcher
  )

  const { proposedIssueTitle, proposedIssueDescription } = useIssueStore()
  const router = useRouter()
  const setProposedIssueTitle = useStore((state) => state.setProposedIssueTitle)
  const setProposedIssueDescription = useStore(
    (state) => state.setProposedIssueDescription
  )
  const handleSubmit = async () => {
    const title = (document.getElementById("title") as HTMLTextAreaElement)
      .value
    const description = (
      document.getElementById("description") as HTMLTextAreaElement
    ).value

    if (!title.trim()) {
      toast.error("Please enter the issue title")
      return
    }

    if (!description.trim()) {
      toast.error("Please enter the issue description")
      return
    }
    try {
      await trigger({
        issue_title: title,
        issue_description: description,
      })
      setProposedIssueTitle(title)
      setProposedIssueDescription(description)
      router.push("/create-detail")
    } catch (error) {
      console.error("create issue error:", error)
      toast.error("there is an error when creating issue, please try again")
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
