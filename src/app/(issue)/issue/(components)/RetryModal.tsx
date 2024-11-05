import { count } from "console"
import React, {
  Dispatch,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react"
import { useStore } from "@/store"
import { Loader2 } from "lucide-react"
import { toast } from "sonner"

import { errorMapping } from "@/lib/api"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"

import RetryButtons from "./RetryButton"

interface RetryModalProps {
  errorDescription: string
  isModalOpen: boolean
  setIsModalOpen: Dispatch<SetStateAction<boolean>>
}

const RetryModal = (props: RetryModalProps) => {
  const { errorDescription, isModalOpen, setIsModalOpen } = props

  const [isRetrying, setIsRetrying] = useState(false)
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle")
  const abortControllerRef = useRef<AbortController | null>(null)

  const {
    proposedIssueTitle,
    proposedIssueDescription,
    error,
    retryCountDown,
    setError,
    setErrorMessage,
    setRetryCountDown,
    setResponseData,
    setIssueId,
  } = useStore()

  useEffect(() => {
    const interval = setInterval(() => {
      if (retryCountDown > 0) {
        setRetryCountDown(retryCountDown - 1)
      }
    }, 1000)
    return () => clearInterval(interval)
  }, [retryCountDown])

  useEffect(() => {
    if (isModalOpen && retryCountDown === 0 && !isRetrying) {
      console.log("Retrying!!!")
      setIsRetrying(true)
      toast.loading(`Retrying...`, { id: "retry" })
      handleSendRequest()
      toast.dismiss("retry")
      setIsRetrying(false)
    }
  }, [retryCountDown])

  const handleSendRequest = async () => {
    setStatus("loading")
    setRetryCountDown(0)
    // setResult(null)

    // Create a new AbortController for this request
    abortControllerRef.current = new AbortController()
    const signal = abortControllerRef.current.signal

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
        signal,
      })
      let countdown = 0

      if (!response.ok) {
        const errorResponse = await response.json()
        if (errorResponse.code === 4029) {
          const match = errorResponse.message.match(/(\d+)s/)
          countdown = match ? parseInt(match[1], 10) : 10
        }
        setError(errorMapping[errorResponse.code].error)
        setErrorMessage(errorMapping[errorResponse.code].description)
        throw new Error(errorResponse.message)
      }
      const data = await response.json()
      setResponseData(data)
      setIssueId(data.data.issue_id)
      setStatus("success")
    } catch (error: any) {
      if (error.name === "AbortError") {
        setStatus("idle")
        // setResult("Request was aborted")
      } else {
        console.error("Fetch error:", error)
        setStatus("error")
        toast.error(`${error.message}`, {
          duration: Infinity,
          dismissible: true,
        })
        setRetryCountDown(5)
        // setResult("An error occurred while fetching data")
      }
    }
  }

  const handleAbortRequest = () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort()
      abortControllerRef.current = null
    }
    setIsModalOpen(false)
  }

  return (
    <AlertDialog open={isModalOpen} onOpenChange={setIsModalOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{error}</AlertDialogTitle>
          <AlertDialogDescription>
            {errorDescription}
            <br />
            {retryCountDown === 0
              ? `Auto Retrying...`
              : `Auto Retrying in ${retryCountDown} seconds.`}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter
          style={{ display: "flex", justifyContent: "center" }}
        >
          <RetryButtons
            status={status}
            handleSendRequest={handleSendRequest}
            handleAbortRequest={handleAbortRequest}
          />
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export default RetryModal
