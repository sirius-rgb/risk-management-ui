import React from "react"
import { Button } from "@/components/ui/button"

interface CreateIssueButtonProps {
  handleSubmit: () => void,
  isLoading: boolean,
  loadingName: string,
  loadedName: string
}

const CreateIssueButton = (props: CreateIssueButtonProps) => {
  const { handleSubmit, isLoading, loadedName, loadingName } = props
  return (
    <Button
      className="mb-4 mt-2 max-h-8 w-full sm:w-96"
      onClick={handleSubmit}
      disabled={isLoading}
    >
      {isLoading ? loadingName : loadedName }
    </Button>
  )
}

export default CreateIssueButton