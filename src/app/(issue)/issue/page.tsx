"use client"

import { useEffect, useState } from "react"
import { useStore } from "@/store"

import { CreateIssuePage } from "./(pages)/create-issue-page"
import { IssueDetailPage } from "./(pages)/issue-detail-page"

const IssuePage = () => {
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

export default IssuePage
