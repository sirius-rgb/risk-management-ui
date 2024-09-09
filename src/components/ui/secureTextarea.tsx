import React from "react"

import { Textarea } from "./textarea"

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
