import useSWRMutation from "swr/mutation"

interface IssueRequest {
  location: string
  issue_id?: string | null
  issue_title: string
  description: string
}

interface IssueResponse {
  status: string
  message: string
  code: number
  data: {
    issue_id: string
    request_id: string
    revised_issue_title: string
    revised_issue_description: string
    additional_information_needed: string
  }
}

async function issueFetcher(
  url: string,
  { arg }: { arg: IssueRequest }
): Promise<IssueResponse> {
  const { location, issue_id, issue_title, description } = arg

  const payload: any = {
    location,
    issue_title,
    description,
  }

  // 只有当 issue_id 存在且不为 null 时，才添加到请求体中
  if (issue_id) {
    payload.issue_id = issue_id
  }

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    })

    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`)
    }

    return await response.json()
  } catch (error) {
    console.error("Error posting issue:", error)
    throw error
  }
}

const url = "http://localhost:8000/api/issue"

export function useIssue() {
  const { trigger, data, error, isMutating } = useSWRMutation(url, issueFetcher)

  const submitIssue = async (
    location: string,
    issue_title: string,
    description: string,
    issue_id?: string | null
  ) => {
    return trigger({
      location,
      issue_title,
      description,
      // 只有当 issue_id 有值时才包含在请求中
      ...(issue_id ? { issue_id } : {}),
    })
  }

  return {
    submitIssue,
    data,
    error,
    isLoading: isMutating,
  }
}
