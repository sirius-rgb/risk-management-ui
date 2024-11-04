import { count } from "console"
import React, { Dispatch, SetStateAction } from "react"
import { useStore } from "@/store"
import { Loader2 } from "lucide-react"
import { toast } from "sonner"

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

interface RetryModalProps {
  error: string
  autoRetry: number
  errorDescription: string
  isModalOpen: boolean
  setIsModalOpen: Dispatch<SetStateAction<boolean>>
  handleRetry: () => void
  handleCancel: () => void
  handleResubmit: () => void
}

const RetryModal = (props: RetryModalProps) => {
  const {
    error,
    autoRetry,
    errorDescription,
    isModalOpen,
    setIsModalOpen,
    handleRetry,
    handleCancel,
    handleResubmit,
  } = (props = props)

  if (autoRetry === 0 && errorDescription !== "") {
    handleCancel()
    toast.loading(`Retrying...`, { id: "retry" })
    // handleResubmit()
  }

  return (
    <AlertDialog open={isModalOpen} onOpenChange={setIsModalOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{error}</AlertDialogTitle>
          <AlertDialogDescription>
            {errorDescription}
            Auto Retrying in {autoRetry} seconds.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter
          style={{ display: "flex", justifyContent: "center" }}
        >
          <AlertDialogCancel onClick={handleCancel}>Cancel</AlertDialogCancel>
          {/* <AlertDialogAction onClick={handleRetry}>Retry</AlertDialogAction> */}
          {/* {isRetryLoading ? (
            <AlertDialogCancel onClick={handleCancel}>Cancel</AlertDialogCancel>
          ) : (
            <AlertDialogAction onClick={handleRetry}>Retry</AlertDialogAction>
          )} */}
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export default RetryModal
