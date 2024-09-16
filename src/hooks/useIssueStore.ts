import { useEffect } from "react"
import { useStore } from "@/store"

import { useLocalStorage } from "./useLocalStorage"

export function useIssueStore() {
  const proposedIssueTitle = useStore((state) => state.proposedIssueTitle)
  const proposedIssueDescription = useStore(
    (state) => state.proposedIssueDescription
  )
  const setProposedIssueTitle = useStore((state) => state.setProposedIssueTitle)
  const setProposedIssueDescription = useStore(
    (state) => state.setProposedIssueDescription
  )

  const [storedTitle, setStoredTitle] = useLocalStorage(
    "proposedIssueTitle",
    ""
  )
  const [storedDescription, setStoredDescription] = useLocalStorage(
    "proposedIssueDescription",
    ""
  )

  useEffect(() => {
    if (storedTitle) setProposedIssueTitle(storedTitle)
    if (storedDescription) setProposedIssueDescription(storedDescription)
  }, [])

  useEffect(() => {
    setStoredTitle(proposedIssueTitle)
  }, [proposedIssueTitle])

  useEffect(() => {
    setStoredDescription(proposedIssueDescription)
  }, [proposedIssueDescription])

  return {
    proposedIssueTitle,
    proposedIssueDescription,
    setProposedIssueTitle,
    setProposedIssueDescription,
  }
}
