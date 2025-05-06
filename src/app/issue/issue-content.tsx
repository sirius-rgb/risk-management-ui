import { useEffect, useRef, useState } from "react"
import { useStore } from "@/store"

import { Button } from "@/components/ui/button"

import CopyButton from "./copy-button"
import StarRating from "./star-rating"

export const IssueContent = () => {
  // 使用ref追踪是否完成初始设置，避免初始渲染时错误判断
  const initialLoadDone = useRef(false)

  const [isEdited, setIsEdited] = useState({
    title: false,
    description: false,
    additionalInfo: false,
  })

  // Track original response values to detect edits
  const [originalValues, setOriginalValues] = useState({
    title: "",
    description: "",
    additionalInfo: "",
  })

  const {
    suggestedIssueTitle,
    suggestedIssueDescription,
    additionalInformationNeeded,
    setSuggestedIssueTitle,
    setSuggestedIssueDescription,
    setAdditionalInformationNeeded,
  } = useStore()

  // 设置初始原始值和重置编辑状态
  useEffect(() => {
    setOriginalValues({
      title: suggestedIssueTitle || "",
      description: suggestedIssueDescription || "",
      additionalInfo: additionalInformationNeeded || "",
    })
    setIsEdited({
      title: false,
      description: false,
      additionalInfo: false,
    })
  }, [])

  // 检查文本是否被编辑
  const checkIfEdited = (
    field: "title" | "description" | "additionalInfo",
    value: string
  ) => {
    // 确保初始加载完成后再进行比较
    if (!initialLoadDone.current) return

    // 获取要比较的原始值
    const originalValue =
      field === "title"
        ? originalValues.title
        : field === "description"
          ? originalValues.description
          : originalValues.additionalInfo

    // 如果原始值为空但当前值不为空，视为已编辑
    if (!originalValue && value.trim() !== "") {
      setIsEdited((prev) => ({ ...prev, [field]: true }))
      return
    }

    // 确保值已被实质性修改（不仅仅是空格差异）
    const normalizedOriginal = originalValue.trim()
    const normalizedCurrent = value.trim()

    if (normalizedOriginal !== normalizedCurrent) {
      setIsEdited((prev) => ({ ...prev, [field]: true }))
    }
  }

  // 添加调试输出帮助排查
  console.log("Original values:", originalValues)
  console.log("Current edited state:", isEdited)
  console.log("Current title:", suggestedIssueTitle)
  console.log("Initial load done:", initialLoadDone.current)

  return (
    <div className="mt-8 border-t border-gray-200 pt-6 dark:border-gray-700">
      <span className="block py-2 pl-4 text-gray-500 dark:text-gray-300">
        It is necessary to amend the suggested issue title and/or description
        before copying them. This measure ensures human oversight.
      </span>
      <span className="block py-2 pl-4 text-gray-500 dark:text-gray-300">
        Tip: Adding a trailing space is acceptable, as it indicates that you
        have reviewed the content. However, you remain responsible for the final
        output.
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
          <div className="relative flex-1">
            <textarea
              id="suggestedIssueTitle"
              value={suggestedIssueTitle}
              onChange={(e) => {
                setSuggestedIssueTitle(e.target.value)
                setIsEdited((prev) => ({ ...prev, title: true }))
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
        </div>

        {/* Suggested Issue Description */}
        <div className="flex items-start gap-4">
          <label
            htmlFor="suggestedIssueDescription"
            className="w-48 flex-shrink-0 pt-2 text-left text-sm font-medium text-gray-700 dark:text-gray-200"
          >
            Suggested Issue Description
          </label>
          <div className="relative flex-1">
            <textarea
              id="suggestedIssueDescription"
              value={suggestedIssueDescription}
              onChange={(e) => {
                const newValue = e.target.value
                setSuggestedIssueDescription(newValue)
                setIsEdited((prev) => ({ ...prev, description: true }))
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
        </div>

        {/* Additional Information Needed */}
        <div className="flex items-start gap-4">
          <label
            htmlFor="additionalInformation"
            className="w-48 flex-shrink-0 pt-2 text-left text-sm font-medium text-gray-700 dark:text-gray-200"
          >
            Additional Information Needed
          </label>

          <div className="relative flex-1">
            <textarea
              id="additionalInformation"
              value={additionalInformationNeeded}
              onChange={(e) => {
                const newValue = e.target.value
                setAdditionalInformationNeeded(newValue)
                setIsEdited((prev) => ({ ...prev, additionalInfo: true }))
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
        </div>
      </div>

      <StarRating />
      <div className="mt-4 flex gap-2 pl-4">
        <Button variant="destructive">Copilot Output is Erratic</Button>
        <Button
          className="bg-gray-300 hover:bg-slate-300 dark:bg-gray-600 dark:text-white dark:hover:bg-gray-500"
          // onClick={() => setTab("TaxonomyCause")}
        >
          Proceed to identify Taxonomy Cause
        </Button>
      </div>
    </div>
  )
}
