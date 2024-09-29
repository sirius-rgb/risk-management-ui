import React from "react"
import { useRouter } from "next/navigation"
import { useStore } from "@/store"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@radix-ui/react-alert-dialog"
import { toast } from "sonner"

import {
  AlertDialogFooter,
  AlertDialogHeader,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import Rating from "@/components/rate"

export const FeedbackDialog =
  () =>
  ({ isLoading, rating }: { isLoading: boolean; rating: number }) => {
    const isFeedbackDialogOpen = useStore((state) => state.isFeedbackDialogOpen)
    const setFeedbackDialogOpen = useStore(
      (state) => state.setFeedbackDialogOpen
    )
    const sendFeedback = useStore((state) => state.sendFeedback)
    const feedback = useStore((state) => state.feedback)
    const setFeedback = useStore((state) => state.setFeedback)
    const router = useRouter()

    const handleFeedbackSubmit = async (event: any) => {
      if (feedback.length === 0) {
        event.preventDefault()
        toast("Please provide feedback")
        // setFeedbackDialogOpen(true)
        return
      } else {
        setFeedbackDialogOpen(false)
        await sendFeedback(rating, "test feedback", "I-1024", "R-2048")
        router.push("/create-issue")
      }
    }

    return (
      <AlertDialog
        open={isFeedbackDialogOpen}
        onOpenChange={setFeedbackDialogOpen}
      >
        <AlertDialogTrigger asChild>
          <Button
            variant="destructive"
            className="h-8 w-full"
            disabled={isLoading}
          >
            Copliot Output is Erratic
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="rounded-tp-2">
              Error Reporting
            </AlertDialogTitle>
            <AlertDialogDescription className="rounded-tp-2 max-h-72 overflow-y-scroll">
              <p>
                This section is used to report instances where you believe the
                AI is behaving erratically or is providing outputs that contain
                material errors or bias or are false, misleading and dangerous.
              </p>
              <ul>
                <p className="py-2">These errors may includes: </p>
                <li>- Hallucinations</li>
                <li>- Factiually woring and/or logically unsound outpus</li>
                <li>
                  - Creating and referencing nonexistent policies, procedures,
                  and processes
                </li>
                <li>Providing responses in another language</li>
                <li>
                  Swearing or responding in harmful and/or unprofession language
                </li>
                <li>Threatening users</li>
                <li>
                  Advising users to break the laws or take unethical course of
                  action
                </li>
                <li>
                  Providing biased response, including gender bias, ageism,
                  racism, etc
                </li>
              </ul>
              <p className="py-2">
                Please note that the segment should not be used to provided
                general feedback on the tool.
              </p>
              <p className="py-1">Materiality of error:</p>
              <p className="py-1">
                Low Risk, Medium Risk, High Risk, Very High Risk
              </p>
              <p className="py-1">Crosses</p>
              <p className="py-1">Green, Amberm, Red, Bright Red</p>
            </AlertDialogDescription>
            <div className="flex gap-2 text-gray-400">
              {" "}
              Quality of the output: <Rating />
            </div>
          </AlertDialogHeader>
          <Textarea
            id="feedback"
            rows={1}
            className="mb-4 mt-2 min-h-32"
            placeholder="Please provide your feedback here!"
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
          />
          <AlertDialogFooter>
            <AlertDialogCancel onClick={(e) => handleFeedbackSubmit(e)}>
              Send
            </AlertDialogCancel>
            <AlertDialogAction onClick={() => setFeedbackDialogOpen(false)}>
              Cancel
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    )
  }
