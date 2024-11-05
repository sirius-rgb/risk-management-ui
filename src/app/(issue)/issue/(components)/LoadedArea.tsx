import React from "react"

import {
  additional_information_needed,
  suggessted_issue_description,
  suggessted_issue_title,
} from "@/lib/conts"
import { Label } from "@/components/ui/label"
import { SecureTextarea } from "@/components/ui/secureTextarea"

interface LoadedAreaProps {
  isAcceptTAndC: boolean
  rated: boolean
  responseData: any
}

const LoadedArea = (props: LoadedAreaProps) => {
  const { isAcceptTAndC, rated, responseData } = props
  return (
    <>
      <Label htmlFor="revisedTitle">{suggessted_issue_title}</Label>
      <SecureTextarea
        id="revisedTitle"
        rows={1}
        disabled={!(isAcceptTAndC && rated)}
        className="mb-4 mt-2 min-h-8 select-none"
        defaultValue={responseData?.data?.revised_issue_title || ""}
        placeholder="Lorem ipsum, dolor sit amet consectetur adipisicing elit. "
      />

      <Label htmlFor="revisedDescription">{suggessted_issue_description}</Label>
      <SecureTextarea
        id="revisedDescription"
        rows={1}
        disabled={!(isAcceptTAndC && rated)}
        className="mb-4 mt-2 min-h-36 select-none"
        defaultValue={responseData?.data?.revised_issue_description || ""}
        placeholder="Lorem ipsum, dolor sit amet consectetur adipisicing elit. "
      />

      <Label htmlFor="additional_information_needed">
        {additional_information_needed}
      </Label>
      <SecureTextarea
        id="additional_information_needed"
        rows={1}
        disabled={!(isAcceptTAndC && rated)}
        defaultValue={responseData?.data?.additional_information_needed || ""}
        className="mb-4 mt-2 min-h-32"
        placeholder={`The LLM will generate the additional information needed for the issue creation`}
      />
    </>
  )
}

export default LoadedArea
