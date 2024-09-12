"use client"

import * as React from "react"

import {
  additionalInfo,
  revisedDescription,
  revisedTitle,
  statement,
} from "@/lib/conts"
import { useStore } from "@/lib/store"
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
} from "@/components/ui/alertDialog"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { SecureTextarea } from "@/components/ui/secureTextarea"
import { Textarea } from "@/components/ui/textarea"
import Rating from "@/components/rate"

export default function Page() {
  const proposedIssueTitle = useStore((state) => state.proposedIssueTitle)
  const proposedIssueDescription = useStore(
    (state) => state.proposedIssueDescription
  )
  const isAcceptTAndC = useStore((state) => state.isAcceptTAndC)
  const setAcceptTAndC = useStore((state) => state.setAcceptTAndC)

  return (
    <section className="m-auto mt-8 p-8 sm:px-16">
      <h2 className="text-4xl  font-semibold text-gray-900 dark:text-white">
        Issue Creation
      </h2>
      <p className="my-3 text-sm text-gray-400">
        Please Provide Details of Control or Risk Gaps Below
      </p>
      <Label htmlFor="title">Proposed Issue Title</Label>
      <Textarea
        id="title"
        rows={1}
        className="mb-4 mt-2 min-h-8 bg-gray-100"
        defaultValue={proposedIssueTitle}
        placeholder="Lorem ipsum, dolor sit amet consectetur adipisicing elit. "
      />
      <Label htmlFor="title">Description of the Risk or Control Gaps</Label>
      <Textarea
        id="title"
        rows={1}
        className="mb-4 mt-2 min-h-64 bg-gray-100"
        defaultValue={proposedIssueDescription}
        placeholder="please provide details of control or risk gaps below"
      />
      <Label htmlFor="title">Revised Issue Title</Label>
      <Textarea
        id="revisedTitle"
        rows={1}
        disabled={!isAcceptTAndC}
        className="mb-4 mt-2 min-h-8 select-none"
        defaultValue={revisedTitle}
        placeholder="Lorem ipsum, dolor sit amet consectetur adipisicing elit. "
      />
      <Label htmlFor="title">Revised Issue Description</Label>
      <Textarea
        id="revisedDescription"
        rows={1}
        disabled={!isAcceptTAndC}
        className="mb-4 mt-2 min-h-36 select-none"
        defaultValue={revisedDescription}
        placeholder="Lorem ipsum, dolor sit amet consectetur adipisicing elit. "
      />
      <Label htmlFor="title">Additional Information Needed</Label>
      <SecureTextarea
        id="title"
        rows={1}
        disabled={!isAcceptTAndC}
        defaultValue={additionalInfo}
        className="mb-4 mt-2 min-h-32"
        placeholder={`The LLM will generate the additional information needed for the issue creation`}
      />
      <Rating />

      <div>
        <AlertDialog>
          <div className="my-2 flex flex-col items-center justify-center space-y-2 sm:flex-row sm:justify-start sm:space-x-2 sm:space-y-0">
            <AlertDialogTrigger asChild>
              <Checkbox id="terms" checked={isAcceptTAndC} />
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
              <AlertDialogTitle className="rounded-t border-b p-2 dark:border-gray-600">
                Are you absolutely sure?
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
      </div>

      <div className="mt-4 flex flex-col space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
        <Button className="h-8 w-full">Review</Button>
        <Feedback />
      </div>
    </section>
  )
}

const Feedback = () => {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="destructive" className="h-8 w-full">
          Copliot Output is Erratic
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="rounded-tp-2">
            Rate the output results of the RM-Copilot.
          </AlertDialogTitle>
          <AlertDialogDescription className="rounded-tp-2">
            You can provide you feedback here!
          </AlertDialogDescription>
        </AlertDialogHeader>
        <Textarea
          id="feedback"
          rows={1}
          className="mb-4 mt-2 min-h-32"
          placeholder="Please provide your feedback here!"
        />
        <AlertDialogFooter>
          <AlertDialogCancel>Send</AlertDialogCancel>
          <AlertDialogAction>Cancel</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
