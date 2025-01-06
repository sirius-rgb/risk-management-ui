import React from "react"

import { statement } from "@/lib/conts"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Checkbox } from "@/components/ui/checkbox"

interface TermsAndConditionProps {
  setAcceptTAndC: any
  isAcceptTAndC: boolean
  isReviewing: boolean
}

const TermsAndConditions = (props: TermsAndConditionProps) => {
  const { isAcceptTAndC, isReviewing, setAcceptTAndC } = props

  return (
    <AlertDialog>
      <div className="my-2 flex flex-col items-center justify-center space-y-2 sm:flex-row sm:justify-start sm:space-x-2 sm:space-y-0">
        <AlertDialogTrigger asChild>
          <Checkbox id="terms" checked={isAcceptTAndC} disabled={isReviewing} />
        </AlertDialogTrigger>
        <label
          htmlFor="terms"
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          Accept terms and conditions
        </label>
      </div>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="rounded-t border-b py-2 text-red-600 dark:border-gray-600">
            Terms and condition
          </AlertDialogTitle>
          <AlertDialogDescription className="rounded-tp-2">
            {statement}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={() => setAcceptTAndC(true)}>
            I accept
          </AlertDialogCancel>
          <AlertDialogAction onClick={() => setAcceptTAndC(false)}>
            Cancel
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export default TermsAndConditions
