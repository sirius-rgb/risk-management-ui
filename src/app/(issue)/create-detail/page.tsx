"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { nanoid } from "nanoid"
import { useShallow } from "zustand/react/shallow"

import { useStore } from "@/lib/store"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

function useIssue() {
  return useStore(
    useShallow((store) => ({
      proposedIssueTitle: store.proposedIssueTitle,
      proposedIssueDescription: store.proposedIssueDescription,
    }))
  )
}

function generateUniqueId() {
  return `R-${nanoid(9)}` // 生成 9 位随机字符串
}

export default function Page() {
  const { proposedIssueTitle, proposedIssueDescription } = useIssue()
  const router = useRouter()
  const [files, setFiles] = useState<FileList | null>(null)
  const [revisedTitle, setRevisedTitle] = useState(
    "This is a Revised Issue Title Generate By RM Co-pilot"
  )
  const [revisedDescription, setRevisedDescription] = useState(
    "This is a Revised Issue Description Generate By RM Co-pilot"
  )
  const [additionalInfo, setAdditionalInfo] = useState(`
        1. What is the risk or control gap?
        2. What is the impact of the risk or control gap?
        3. What is the proposed solution?
        `)
  const uniqueId = generateUniqueId()
  const randomString = nanoid()
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
        defaultValue={proposedIssueTitle}
        placeholder="Lorem ipsum, dolor sit amet consectetur adipisicing elit. "
      />
      <Label htmlFor="title">Description of the Risk or Control Gaps</Label>
      <Textarea
        id="title"
        rows={1}
        className="mb-4 mt-2 min-h-64"
        defaultValue={proposedIssueDescription}
        placeholder="please provide details of control or risk gaps below"
      />
      <Label htmlFor="title">Any Supporting files for upload / review?</Label>
      <Textarea
        id="title"
        rows={1}
        className="mb-4 mt-2 min-h-8"
        // defaultValue={files?.length}
        placeholder="please upload any supporting files for upload / review"
      />
      <Label htmlFor="title">Revised Issue Title</Label>
      <Textarea
        id="title"
        rows={1}
        className="mb-4 mt-2 min-h-8"
        defaultValue={revisedTitle}
        placeholder="Lorem ipsum, dolor sit amet consectetur adipisicing elit. "
      />
      <Label htmlFor="title">Revised Issue Description</Label>
      <Textarea
        id="title"
        rows={1}
        className="mb-4 mt-2 min-h-8"
        defaultValue={revisedDescription}
        placeholder="Lorem ipsum, dolor sit amet consectetur adipisicing elit. "
      />
      <Label htmlFor="title">Additional Information Needed</Label>
      <Textarea
        id="title"
        rows={1}
        value={additionalInfo}
        className="mb-4 mt-2 min-h-32"
        placeholder={`
        1. What is the risk or control gap?
        2. What is the impact of the risk or control gap?
        3. What is the proposed solution?
        `}
      />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <Label htmlFor="title">Proposed Risk Taxonomy Linkage</Label>
          <Textarea
            id="title"
            rows={1}
            value={uniqueId}
            className="mb-4 mt-2 min-h-8"
            placeholder="R-123456789 Risk of a failing asleep"
          />
        </div>
        <div>
          <Label htmlFor="title">Proposed Root Cause Taxonomy</Label>
          <Textarea
            id="title"
            rows={1}
            value={randomString}
            className="mb-4 mt-2 min-h-8"
            placeholder="People"
          />
        </div>
      </div>
      <Button
        className="mb-4 mt-2 max-h-8 w-96"
        onClick={() => router.push("/review")}
      >
        Review
      </Button>
    </section>
  )
}
