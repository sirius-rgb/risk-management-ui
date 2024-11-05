import React, { useRef } from "react"
import { Check, Copy } from "lucide-react"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

interface TextareaWithCopyProps {
  id: string
  label: string
  rows: number
  defaultValue: string
  // textareaRef: React.RefObject<HTMLTextAreaElement>
  className: string
  handleChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
  isLoading?: boolean
  maxLength?: number
  isLengthExceeded?: boolean
}

const TextareaWithCopy = (props: TextareaWithCopyProps) => {
  const {
    id,
    label,
    rows,
    defaultValue,
    // textareaRef,
    className,
    handleChange,
    isLoading,
    maxLength,
    isLengthExceeded,
  } = props

  const [isCopied, setIsCopied] = React.useState(false)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText("aaaaa")
      setIsCopied(true)
      setTimeout(() => setIsCopied(false), 2000)
    } catch (err) {
      console.error("Failed to copy code: ", err)
    }
  }

  return (
    <div>
      <Label htmlFor={id}>{label}</Label>
      <div className="relative">
        <Textarea
          id={id}
          rows={rows}
          className={`${className}`}
          defaultValue={defaultValue}
          onChange={handleChange}
          disabled={isLoading}
        />
        <div className="absolute right-2 top-2 flex flex-col space-y-2">
          <Button
            variant="outline"
            size="icon"
            onClick={handleCopy}
            title="复制文本"
            aria-label={isCopied ? "Copied" : "Copy to clipboard"}
          >
            {isCopied ? (
              <Check className="h-4 w-4 text-green-500" />
            ) : (
              <Copy className="h-4 w-4" />
            )}
          </Button>
        </div>
      </div>
      {isLengthExceeded && (
        <p className="pb-2 text-sm text-red-500">
          Title exceeds maximum length of {maxLength} characters.
        </p>
      )}
    </div>
  )
}

export default TextareaWithCopy
