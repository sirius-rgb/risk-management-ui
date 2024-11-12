import { count } from "console"
import React, {
  Dispatch,
  SetStateAction,
  useEffect,
  useMemo,
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

import OKButton from "./OKButton"
import RetryButtons from "./RetryButton"

interface RetryModalProps {}

const RetryModal = (props: RetryModalProps) => {
  const [isRetrying, setIsRetrying] = useState(false)
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle")
  const abortControllerRef = useRef<AbortController | null>(null)

  const {
    proposedIssueTitle,
    proposedIssueDescription,
    error,
    errorCode,
    errorMessage,
    retryCountDown,
    isRetryModalOpen,
    responseData,
    retryTimes,
    setRetryTimes,
    setError,
    setErrorCode,
    setErrorMessage,
    setRetryCountDown,
    setResponseData,
    setRetryModalOpen,
    setIssueId,
  } = useStore()

  const buttonType = errorMapping[errorCode]?.buttonType

  useEffect(() => {
    const interval = setInterval(() => {
      if (retryCountDown > 0) {
        setRetryCountDown(retryCountDown - 1)
      }
    }, 1000)
    return () => clearInterval(interval)
  }, [retryCountDown])

  useEffect(() => {
    if (
      isRetryModalOpen &&
      retryCountDown === 0 &&
      !isRetrying &&
      buttonType === "retry"
    ) {
      setIsRetrying(true)
      toast.loading(`Retrying...`, { id: "retry" })
      handleSendRequest()
      toast.dismiss("retry")
      setIsRetrying(false)
    }
  }, [retryCountDown])

  const handleSendRequest = async () => {
    if (isRetrying) return
    setIsRetrying(true)
    setStatus("loading")
    setRetryTimes(retryTimes + 1)
    setRetryCountDown(0)
    toast.loading(`Retrying...`, { id: "retry" })
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
          retry_attempts: retryTimes ?? 0,
          retry_timeout: Math.min(90 + 30 * (retryTimes ?? 0), 300),
        }),
        signal,
      })
      let countdown = 0

      if (!response.ok) {
        const errorResponse = await response.json()
        setRetryCountDown(
          errorMapping[errorResponse.code].retryCountdown as number
        )
        if (errorResponse.code === 4029) {
          const match = errorResponse.message.match(/(\d+)s/)
          countdown = match ? parseInt(match[1], 10) : 10
          setRetryCountDown(countdown)
        }
        setError(errorMapping[errorResponse.code].error)
        setErrorCode(errorResponse.code)
        setErrorMessage(errorMapping[errorResponse.code].description)
        throw new Error(errorResponse.message)
      }
      const data = await response.json()
      // setResponseData(data)
      setResponseData({ ...data })

      setIssueId(data.data.issue_id)
      setStatus("success")
      setRetryModalOpen(false)
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
        // setRetryCountDown(5)
        // setResult("An error occurred while fetching data")
      }
    } finally {
      setIsRetrying(false)
      toast.dismiss("retry")
    }
  }

  const handleAbortRequest = () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort()
      abortControllerRef.current = null
    }
    setRetryModalOpen(false)
    toast.dismiss("retry")
  }
  const renderModalContent = useMemo(() => {
    const renderDefaultContent = () => (
      <AlertDialogDescription className="flex flex-col items-center justify-center space-y-4">
        <span className="text-center text-xl font-semibold text-red-500">
          An unexpected error occurred.
        </span>
        <p className="text-base text-gray-500">
          Please try again later or contact support if the problem persists.
        </p>
        <OKButton handleClick={() => setRetryModalOpen(false)}>OK</OKButton>
      </AlertDialogDescription>
    )

    const renderErrorWithRetry = (message: string) => (
      <AlertDialogDescription>
        <span className="my-2 text-base">{message}</span>
        {buttonType === "retry" && (
          <span className="mx-auto block py-2 text-center font-semibold">
            <br />
            {retryCountDown === 0
              ? `Auto Retrying...`
              : `Auto Retrying in ${retryCountDown} seconds.`}
          </span>
        )}
        <RetryButtons
          status={status}
          handleSendRequest={handleSendRequest}
          handleAbortRequest={handleAbortRequest}
        />
      </AlertDialogDescription>
    )

    const renderErrorWithoutRetry = (message: string) => (
      <AlertDialogDescription className="flex flex-col ">
        <span className="my-2 text-base">{message}</span>
        <OKButton handleClick={() => setRetryModalOpen(false)}>OK</OKButton>
      </AlertDialogDescription>
    )

    switch (errorCode.toString()) {
      case "400":
      case "403":
        return renderErrorWithoutRetry(errorMessage)
      case "4029":
      case "5000":
      case "5004":
        return renderErrorWithRetry(errorMessage)
      default:
        return renderDefaultContent()
    }
  }, [
    errorCode,
    errorMessage,
    retryCountDown,
    setRetryModalOpen,
    status,
    buttonType,
  ])

  return (
    <AlertDialog open={isRetryModalOpen} onOpenChange={setRetryModalOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{error}</AlertDialogTitle>
        </AlertDialogHeader>
        {renderModalContent}
        {/* <AlertDialogDescription>
            {errorMessage}
            <br />
            {buttonType === "retry" && (
              <span>
                {retryCountDown === 0
                  ? `Auto Retrying...`
                  : `Auto Retrying in ${retryCountDown} seconds.`}
              </span>
            )}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter
          style={{ display: "flex", justifyContent: "center" }}
        >
          {buttonType === "ok" ? (
            <OKButton handleClick={() => setRetryModalOpen(false)}>OK</OKButton>
          ) : (
            <RetryButtons
              status={status}
              handleSendRequest={handleSendRequest}
              handleAbortRequest={handleAbortRequest}
            />
          )} */}
        {/* </AlertDialogFooter> */}
      </AlertDialogContent>
    </AlertDialog>
  )
}

export default RetryModal
