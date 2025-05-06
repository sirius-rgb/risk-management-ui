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
import { Tabs, TabsContent } from "@/components/ui/tabs"

import { IssueContent } from "./issue-content"
import IssueSkeleton from "./skeleton"
import StarRating from "./star-rating"
import { TabList } from "./tab-list"
import TermsAndConditions from "./terms-and-condition"

const IssuePage = () => {
  const [tab, setTab] = useState("Issue")

  const {
    issueLocation,
    draftIssueTitle,
    draftIssueDescription,
    isAcceptTAndC,
    suggestedIssueTitle,
    suggestedIssueDescription,
    issueId,
    setAcceptTAndC,
    setIssueLocation,
    setDraftIssueTitle,
    setDraftIssueDescription,
    setSuggestedIssueTitle,
    setSuggestedIssueDescription,
    setAdditionalInformationNeeded,
    setIssueId,
    setRequestId,
    setResponseData,
  } = useStore()

  const { submitIssue, data, error, isLoading } = useIssue()

  useEffect(() => {
    if (data && data.status === "success") {
      setResponseData(data)
      setSuggestedIssueTitle(data.data.revised_issue_title)
      setSuggestedIssueDescription(data.data.revised_issue_description)
      setAdditionalInformationNeeded(data.data.additional_information_needed)
      setIssueId(data.data.issue_id)
      setRequestId(data.data.request_id)
    }
  }, [
    data,
    setSuggestedIssueTitle,
    setSuggestedIssueDescription,
    setAdditionalInformationNeeded,
    setIssueId,
    setRequestId,
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

    await submitIssue(
      issueLocation,
      draftIssueTitle,
      draftIssueDescription,
      issueId
    )
  }

  return (
    <section className="m-12">
      <Tabs value={tab} onValueChange={setTab} className="w-full">
        <TabList />

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

          {isLoading ? (
            <IssueSkeleton />
          ) : data && data.status === "success" ? (
            <IssueContent />
          ) : null}
        </TabsContent>
        <TabsContent value="Taxonomy Cause">
          <StarRating />
        </TabsContent>
        <TabsContent value="Action">Action.</TabsContent>
        <TabsContent value="Control">Control.</TabsContent>
      </Tabs>
    </section>
  )
}

export default IssuePage
