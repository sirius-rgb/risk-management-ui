"use client"

import { useEffect, useState } from "react"
import { useStore } from "@/store"

import { CreateIssuePage } from "./create-issue-page"
import { IssueDetailPage } from "./issue-detail-page"

const Issue = () => {
  const { responseData } = useStore()

  const [hasResponseData, setHasResponseData] = useState(false)

  useEffect(() => {
    if (responseData && responseData.status === "Success") {
      setHasResponseData(true)
    } else {
      setHasResponseData(false)
    }
  }, [responseData])

  return hasResponseData ? <IssueDetailPage /> : <CreateIssuePage />
}

export default Issue
