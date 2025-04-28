"use client"

import React, { useState } from "react"
import { Check, Copy } from "lucide-react"
import { toast } from "sonner"

interface CopyButtonProps {
  text: string
  isEnabled?: boolean
  disabledMessage?: string
}

const CopyButton: React.FC<CopyButtonProps> = ({
  text,
  isEnabled = true,
  disabledMessage = "Please edit the content before copying",
}) => {
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    // If copying is not enabled, show warning toast
    if (!isEnabled) {
      toast.warning(disabledMessage)
      return
    }

    // Get the textarea content by finding its parent and then the textarea
    const button = document.activeElement as HTMLElement
    const parent = button?.parentElement
    const textarea = parent?.querySelector("textarea") as HTMLTextAreaElement

    if (textarea?.value) {
      navigator.clipboard
        .writeText(textarea.value)
        .then(() => {
          setCopied(true)
          toast.success(`Copied ${text} to clipboard`)

          // Reset the copied state after animation
          setTimeout(() => {
            setCopied(false)
          }, 2000)
        })
        .catch((err) => {
          toast.error("Failed to copy text")
          console.error("Failed to copy:", err)
        })
    } else {
      toast.error("Nothing to copy. The field is empty.")
    }
  }

  return (
    <button
      type="button"
      onClick={handleCopy}
      className={`absolute right-2 top-2 rounded-md p-1 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-800 dark:focus:ring-gray-400 ${
        isEnabled
          ? "text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-gray-200"
          : "cursor-not-allowed text-gray-400 dark:text-gray-500"
      }`}
      aria-label={
        isEnabled ? `Copy ${text}` : `Cannot copy ${text} until edited`
      }
      title={isEnabled ? `Copy ${text}` : disabledMessage}
    >
      {copied ? (
        <Check className="h-5 w-5 text-green-500 transition-all dark:text-green-400" />
      ) : (
        <Copy className="h-5 w-5 transition-all" />
      )}
    </button>
  )
}

export default CopyButton
