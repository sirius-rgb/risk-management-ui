import React, { useRef } from "react"
import { Copy } from "lucide-react"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

interface TextareaWithCopyProps {
  id: string
  label: string
  // textareaRef: React.RefObject<HTMLTextAreaElement>
  className: string
  handleChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
  isLoading: boolean
  maxLength: number
  isLengthExceeded: boolean
}

const TextareaWithCopy = (props: TextareaWithCopyProps) => {
  const {
    id,
    label,
    // textareaRef,
    className,
    handleChange,
    isLoading,
    maxLength,
    isLengthExceeded,
  } = props
  // const ref = textareaRef || useRef<HTMLTextAreaElement>(null)
  const handleCopy = (e: any) => {
    console.log("copy")

    // if (textareaRef.current) {
    //   navigator.clipboard
    //     .writeText(textareaRef.current.value)
    //     .then(() => {
    //       toast("Copied!")
    //     })
    //     .catch((err) => {
    //       console.error("无法复制文本: ", err)
    //       toast("Failed to copy!")
    //     })
    // }
  }

  return (
    <div>
      <Label htmlFor={id}>{label}</Label>
      <div className="relative">
        <Textarea
          id={id}
          rows={1}
          // ref={ref}
          className={`${className}`}
          onChange={handleChange}
          disabled={isLoading}
        />
        <div className="absolute right-2 top-2 flex flex-col space-y-2">
          <Button
            variant="outline"
            size="icon"
            onClick={handleCopy}
            title="复制文本"
          >
            <Copy className="h-4 w-4" />
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
