"use client"

import { Loader2 } from "lucide-react"

import { Button } from "@/components/ui/button"

interface RetryModalProps {
  status: "idle" | "loading" | "success" | "error"
  handleSendRequest: () => void
  handleAbortRequest: () => void
}

export default function RetryButtons(props: RetryModalProps) {
  const { status, handleSendRequest, handleAbortRequest } = props

  return (
    <span className="m-auto my-2 block space-y-4">
      <span className="block space-x-4 text-center">
        <Button
          onClick={handleSendRequest}
          disabled={status === "loading"}
          aria-label="Send request"
        >
          {status === "loading" ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Retrying...
            </>
          ) : (
            "Retry"
          )}
        </Button>
        <Button
          onClick={handleAbortRequest}
          disabled={status !== "loading"}
          variant="destructive"
          aria-label="Abort request"
        >
          Cancel
        </Button>
      </span>
    </span>
  )
}
