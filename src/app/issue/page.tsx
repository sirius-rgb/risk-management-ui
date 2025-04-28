"use client"

import { useEffect, useState } from "react"
import { useStore } from "@/store"
import { toast } from "sonner"

import { useIssue } from "@/hooks/useIssue"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Skeleton } from "@/components/ui/skeleton"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

import CopyButton from "./copy-button"
import StarRating from "./star-rating"
import TermsAndConditions from "./terms-and-condition"

const IssuePage = () => {
  const [tab, setTab] = useState("Issue")
  const [showResults, setShowResults] = useState(false)
  const [isEdited, setIsEdited] = useState({
    title: false,
    description: false,
    additionalInfo: false,
  })

  const {
    issueLocation,
    draftIssueTitle,
    draftIssueDescription,
    isAcceptTAndC,
    suggestedIssueTitle,
    suggestedIssueDescription,
    additionalInformationNeeded,
    setAcceptTAndC,
    setIssueLocation,
    setDraftIssueTitle,
    setDraftIssueDescription,
    setSuggestedIssueTitle,
    setSuggestedIssueDescription,
    setAdditionalInformationNeeded,
    setResponseData,
  } = useStore()

  const { submitIssue, data, error, isLoading } = useIssue()

  // Track original response values to detect edits
  const [originalValues, setOriginalValues] = useState({
    title: "",
    description: "",
    additionalInfo: "",
  })

  // Track the request ID to reset the feedback on rerun
  const [requestId, setRequestId] = useState<string | null>(null)

  useEffect(() => {
    if (data && data.status === "success") {
      setResponseData(data)
      setSuggestedIssueTitle(data.data.revised_issue_title)
      setSuggestedIssueDescription(data.data.revised_issue_description)
      setAdditionalInformationNeeded(data.data.additional_information_needed)

      // Store original values to compare against later
      setOriginalValues({
        title: data.data.revised_issue_title,
        description: data.data.revised_issue_description,
        additionalInfo: data.data.additional_information_needed,
      })

      // Reset edited states
      setIsEdited({
        title: false,
        description: false,
        additionalInfo: false,
      })
    }
  }, [
    data,
    setSuggestedIssueTitle,
    setSuggestedIssueDescription,
    setAdditionalInformationNeeded,
    setResponseData,
  ])

  const handleSubmit = async () => {
    if (!draftIssueTitle || !draftIssueDescription || !issueLocation) {
      toast.warning(
        "Please fill in all required fields before submitting the issue."
      )
      return
    }

    if (!isAcceptTAndC) {
      toast.warning(
        "Please read the Terms and Conditions and accept them before submitting the issue."
      )
      return
    }

    // Set a new request ID to reset feedback
    setRequestId(Date.now().toString())

    // Show results section and skeletons
    setShowResults(true)

    try {
      await submitIssue(issueLocation, draftIssueTitle, draftIssueDescription)
      // Success is handled by the useEffect above
    } catch (err) {
      // Error is already handled by SWR and available via the error variable
    }
  }

  // Check if text has been edited from original
  const checkIfEdited = (
    field: "title" | "description" | "additionalInfo",
    value: string
  ) => {
    if (field === "title" && value !== originalValues.title) {
      setIsEdited((prev) => ({ ...prev, title: true }))
    } else if (
      field === "description" &&
      value !== originalValues.description
    ) {
      setIsEdited((prev) => ({ ...prev, description: true }))
    } else if (
      field === "additionalInfo" &&
      value !== originalValues.additionalInfo
    ) {
      setIsEdited((prev) => ({ ...prev, additionalInfo: true }))
    }
  }

  return (
    <section className="m-12">
      <Tabs value={tab} onValueChange={setTab} className="w-full">
        <TabsList className="flex w-full gap-2 bg-white dark:bg-background">
          <TabsTrigger
            value="Issue"
            className="flex-1 rounded-md bg-gray-100 px-4 py-2 text-center text-lg font-medium focus:outline-none focus:ring-2 focus:ring-gray-800 data-[state=active]:bg-gray-300 dark:bg-gray-700 dark:text-gray-100 dark:focus:ring-gray-400 dark:data-[state=active]:bg-gray-600"
          >
            Issue
          </TabsTrigger>
          <TabsTrigger
            value="TaxonomyCause"
            className="flex-1 rounded-md bg-gray-100 px-4 py-2 text-center text-lg font-medium focus:outline-none focus:ring-2 focus:ring-gray-800 data-[state=active]:bg-gray-300 dark:bg-gray-700 dark:text-gray-100 dark:focus:ring-gray-400 dark:data-[state=active]:bg-gray-600"
          >
            Taxonomy Cause
          </TabsTrigger>
          <TabsTrigger
            value="Action"
            className="flex-1 rounded-md bg-gray-100 px-4 py-2 text-center text-lg font-medium focus:outline-none focus:ring-2 focus:ring-gray-800 data-[state=active]:bg-gray-300 dark:bg-gray-700 dark:text-gray-100 dark:focus:ring-gray-400 dark:data-[state=active]:bg-gray-600"
          >
            Action
          </TabsTrigger>
          <TabsTrigger
            value="Control"
            className="flex-1 rounded-md bg-gray-100 px-4 py-2 text-center text-lg font-medium focus:outline-none focus:ring-2 focus:ring-gray-800 data-[state=active]:bg-gray-300 dark:bg-gray-700 dark:text-gray-100 dark:focus:ring-gray-400 dark:data-[state=active]:bg-gray-600"
          >
            Control
          </TabsTrigger>
        </TabsList>

        <TabsContent
          value="Issue"
          className="bg-gray-100 py-8 dark:bg-gray-800"
        >
          <div>
            <span className="py-2 pl-4 text-gray-500 dark:text-gray-300">
              Please enter the Issue title and description in the input fields
              below
            </span>
            <div className="mt-4 flex flex-col gap-4 px-4">
              {/* Issue Location Row */}
              <div className="flex items-center gap-4">
                <label
                  htmlFor="issueLocation"
                  className="w-48 flex-shrink-0 text-left text-sm font-medium text-gray-700 dark:text-gray-200"
                >
                  Issue Location
                </label>
                <Select
                  onValueChange={(value) => {
                    setIssueLocation(value)
                  }}
                  value={issueLocation}
                >
                  <SelectTrigger className="w-full max-w-[240px] border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200">
                    <SelectValue placeholder="Select the Issue Location" />
                  </SelectTrigger>
                  <SelectContent className="dark:bg-gray-700 dark:text-gray-200">
                    <SelectItem value="Hong Kong">Hong Kong</SelectItem>
                    <SelectItem value="United Kindom">United Kindom</SelectItem>
                    <SelectItem value="INDIA">INDIA</SelectItem>
                    <SelectItem value="MEXICO">MEXICO</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Draft Issue Title Row */}
              <div className="flex items-center gap-4">
                <label
                  htmlFor="issueTitle"
                  className="w-48 flex-shrink-0 text-left text-sm font-medium text-gray-700 dark:text-gray-200"
                >
                  Draft Issue Title
                </label>
                <textarea
                  id="issueTitle"
                  placeholder="Issue Title"
                  value={draftIssueTitle}
                  className="flex-1 overflow-hidden rounded-md border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-gray-800 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200 dark:focus:ring-gray-400"
                  style={{ resize: "none", overflow: "hidden" }}
                  rows={1}
                  onChange={(e) => {
                    e.target.style.height = "auto"
                    e.target.style.height = `${Math.max(e.target.scrollHeight, 38)}px`
                    setDraftIssueTitle(e.target.value)
                  }}
                />
              </div>

              {/* Draft Issue Description Row */}
              <div className="flex items-start gap-4">
                <label
                  htmlFor="issueDescription"
                  className="w-48 flex-shrink-0 pt-2 text-left text-sm font-medium text-gray-700 dark:text-gray-200"
                >
                  Draft Issue Description
                </label>
                <textarea
                  id="issueDescription"
                  placeholder="Issue Description"
                  value={draftIssueDescription}
                  className="min-h-[100px] flex-1 rounded-md border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-gray-800 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200 dark:focus:ring-gray-400"
                  style={{ resize: "vertical" }}
                  onChange={(e) => {
                    e.target.style.height = "auto"
                    e.target.style.height = `${Math.max(e.target.scrollHeight, 100)}px`
                    setDraftIssueDescription(e.target.value)
                  }}
                />
              </div>
            </div>
          </div>

          <TermsAndConditions
            isAcceptTAndC={isAcceptTAndC}
            setAcceptTAndC={setAcceptTAndC}
          />

          <Button
            className="m-4 w-[180px] p-4"
            onClick={handleSubmit}
            disabled={
              isLoading ||
              !isAcceptTAndC ||
              !draftIssueTitle ||
              !draftIssueDescription ||
              !issueLocation
            }
          >
            {isLoading ? "Processing..." : "Send / Rerun"}
          </Button>

          {/* Results Section - Only show after submit */}
          {showResults && (
            <div className="mt-8 border-t border-gray-200 pt-6 dark:border-gray-700">
              <span className="block py-2 pl-4 text-gray-500 dark:text-gray-300">
                It is necessary to amend the suggested issue title and/or
                description before copying them. This measure ensures human
                oversight.
              </span>
              <span className="block py-2 pl-4 text-gray-500 dark:text-gray-300">
                Tip: Adding a trailing space is acceptable, as it indicates that
                you have reviewed the content. However, you remain responsible
                for the final output.
              </span>

              <div className="mt-4 flex flex-col gap-4 px-4">
                {/* Suggested Issue Title */}
                <div className="flex items-center gap-4">
                  <label
                    htmlFor="suggestedIssueTitle"
                    className="w-48 flex-shrink-0 text-left text-sm font-medium text-gray-700 dark:text-gray-200"
                  >
                    Suggested Issue Title
                  </label>
                  {isLoading ? (
                    <Skeleton className="h-10 flex-1 rounded-md bg-slate-500 dark:bg-gray-600" />
                  ) : (
                    <div className="relative flex-1">
                      <textarea
                        id="suggestedIssueTitle"
                        value={suggestedIssueTitle}
                        onChange={(e) => {
                          setSuggestedIssueTitle(e.target.value)
                          checkIfEdited("title", e.target.value)
                        }}
                        placeholder="AI will generate a suggested title"
                        className="w-full overflow-hidden rounded-md border border-gray-300 p-2 pr-10 focus:outline-none focus:ring-2 focus:ring-gray-800 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200"
                        style={{ resize: "none", overflow: "hidden" }}
                        rows={1}
                      />
                      <CopyButton
                        text="Suggested Issue Title"
                        isEnabled={isEdited.title}
                        disabledMessage="Please edit the suggested title before copying"
                      />
                    </div>
                  )}
                </div>

                {/* Suggested Issue Description */}
                <div className="flex items-start gap-4">
                  <label
                    htmlFor="suggestedIssueDescription"
                    className="w-48 flex-shrink-0 pt-2 text-left text-sm font-medium text-gray-700 dark:text-gray-200"
                  >
                    Suggested Issue Description
                  </label>
                  {isLoading ? (
                    <Skeleton className="h-28 flex-1 rounded-md bg-slate-500 dark:bg-gray-600" />
                  ) : (
                    <div className="relative flex-1">
                      <textarea
                        id="suggestedIssueDescription"
                        value={suggestedIssueDescription}
                        onChange={(e) => {
                          setSuggestedIssueDescription(e.target.value)
                          checkIfEdited("description", e.target.value)
                        }}
                        placeholder="AI will generate a suggested description"
                        className="min-h-[100px] w-full rounded-md border border-gray-300 p-2 pr-10 focus:outline-none focus:ring-2 focus:ring-gray-800 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200"
                        style={{ resize: "vertical" }}
                      />
                      <CopyButton
                        text="Suggested Issue Description"
                        isEnabled={isEdited.description}
                        disabledMessage="Please edit the suggested description before copying"
                      />
                    </div>
                  )}
                </div>

                {/* Additional Information Needed */}
                <div className="flex items-start gap-4">
                  <label
                    htmlFor="additionalInformation"
                    className="w-48 flex-shrink-0 pt-2 text-left text-sm font-medium text-gray-700 dark:text-gray-200"
                  >
                    Additional Information Needed
                  </label>
                  {isLoading ? (
                    <Skeleton className="h-28 flex-1 rounded-md bg-slate-500 dark:bg-gray-600" />
                  ) : (
                    <div className="relative flex-1">
                      <textarea
                        id="additionalInformation"
                        value={additionalInformationNeeded}
                        onChange={(e) => {
                          setAdditionalInformationNeeded(e.target.value)
                          checkIfEdited("additionalInfo", e.target.value)
                        }}
                        placeholder="AI will suggest additional information needed"
                        className="min-h-[100px] w-full rounded-md border border-gray-300 p-2 pr-10 focus:outline-none focus:ring-2 focus:ring-gray-800 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200"
                        style={{ resize: "vertical" }}
                      />
                      <CopyButton
                        text="Additional Information"
                        isEnabled={isEdited.additionalInfo}
                        disabledMessage="Please edit the additional information before copying"
                      />
                    </div>
                  )}
                </div>
              </div>

              <StarRating requestId={requestId} />
              <div className="mt-4 flex gap-2 pl-4">
                <Button variant="destructive">Copilot Output is Erratic</Button>
                <Button
                  className="bg-gray-300 hover:bg-slate-300 dark:bg-gray-600 dark:text-white dark:hover:bg-gray-500"
                  onClick={() => setTab("TaxonomyCause")}
                >
                  Proceed to identify Taxonomy Cause
                </Button>
              </div>
            </div>
          )}
        </TabsContent>
        <TabsContent value="TaxonomyCause">Taxonomy Cause.</TabsContent>
        <TabsContent value="Action">Action.</TabsContent>
        <TabsContent value="Control">Control.</TabsContent>
      </Tabs>
    </section>
  )
}

export default IssuePage
