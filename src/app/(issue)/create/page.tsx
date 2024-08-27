"use client"

import { useRouter } from "next/navigation"
import { useShallow } from "zustand/react/shallow"

import { useStore } from "@/lib/store"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

function useIssue() {
  return useStore(
    useShallow((store) => ({
      count: store.count,
      setProposedIssueTitle: store.setProposedIssueTitle,
      setProposedIssueDescription: store.setProposedIssueDescription,
    }))
  )
}
export default function Page() {
  const router = useRouter()
  const { setProposedIssueTitle, setProposedIssueDescription } = useIssue()

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
        onChange={(e) => setProposedIssueTitle(e.target.value)}
      />

      <Label htmlFor="description">
        Description of the Risk or Control Gaps
      </Label>
      <Textarea
        id="description"
        className="mb-4 mt-2 min-h-64"
        placeholder="e.g. The current access control mechanisms in place for sensitive data within the organization are inadequate, allowing unauthorized personnel to potentially access confidential information. This gap could lead to data breaches, unauthorized data manipulation, and a loss of customer trust. The lack of role-based access controls (RBAC) and periodic access reviews exacerbates this risk, making it imperative to strengthen access policies and implement stricter data governance practices."
        onChange={(e) => setProposedIssueDescription(e.target.value)}
      />
      <Button
        className="mb-4 mt-2 max-h-8 w-96"
        onClick={() => {
          router.push("/create-detail")
          // setProposedIssueTitle("test title")
          // setProposedIssueDescription("test description")
        }}
      >
        Create
      </Button>
    </section>
  )
}
