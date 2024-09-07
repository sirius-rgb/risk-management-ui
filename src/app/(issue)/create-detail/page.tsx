"use client"

import { useState } from "react"
import * as React from "react"
import { useRouter } from "next/navigation"
import { nanoid } from "nanoid"

import { useStore } from "@/lib/slices"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import Rating from "@/components/rate"

function generateUniqueId() {
  return `R-${nanoid(9)}` // 生成 9 位随机字符串
}

export default function Page() {
  const count = useStore((state) => state.count)
  const bears = useStore((state) => state.bears)
  const proposedIssueTitle = useStore((state) => state.proposedIssueTitle)
  const proposedIssueDescription = useStore(
    (state) => state.proposedIssueDescription
  )
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
        className="mb-4 mt-2 min-h-8 bg-gray-100"
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
      <Label htmlFor="title" className="select-none">
        Additional Information Needed
      </Label>
      <SecureTextarea
        id="title"
        rows={1}
        defaultValue={additionalInfo}
        className="mb-4 mt-2 min-h-32 select-none"
        // disabled={true}
        placeholder={`
       1. What is the risk or control gap?
       2. What is the impact of the risk or control gap?
       3. What is the proposed solution?
       `}
      />
      <Rating />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <Label htmlFor="title">Proposed Risk Taxonomy Linkage</Label>
          <Textarea
            id="title"
            rows={1}
            defaultValue={uniqueId}
            className="mb-4 mt-2 min-h-8"
            placeholder="R-123456789 Risk of a failing asleep"
          />
        </div>
        <div>
          <Label htmlFor="title">Proposed Root Cause Taxonomy</Label>
          <Textarea
            id="title"
            rows={1}
            defaultValue={randomString}
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

const SecureTextarea = React.forwardRef<
  HTMLTextAreaElement,
  React.TextareaHTMLAttributes<HTMLTextAreaElement>
>(({ disabled, ...props }, ref) => {
  const textareaRef = React.useRef<HTMLTextAreaElement>(null)

  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "c") {
        e.preventDefault() // 禁止 Ctrl+C 或 Command+C 复制
      }
    }

    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault() // 禁止右键菜单
    }

    const handleCopy = (e: ClipboardEvent) => {
      e.preventDefault() // 禁止复制操作
    }

    const textareaElement = textareaRef.current

    if (textareaElement && disabled) {
      textareaElement.addEventListener("keydown", handleKeyDown)
      textareaElement.addEventListener("contextmenu", handleContextMenu)
      textareaElement.addEventListener("copy", handleCopy)
    }

    return () => {
      if (textareaElement) {
        textareaElement.removeEventListener("keydown", handleKeyDown)
        textareaElement.removeEventListener("contextmenu", handleContextMenu)
        textareaElement.removeEventListener("copy", handleCopy)
      }
    }
  }, [disabled])

  return (
    <Textarea ref={ref ? ref : textareaRef} disabled={disabled} {...props} />
  )
})

SecureTextarea.displayName = "SecureTextarea"

export { SecureTextarea }
