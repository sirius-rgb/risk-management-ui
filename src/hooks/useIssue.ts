import useSWR from "swr"
import useSWRMutation from "swr/mutation"

interface IssueRequest {
  location: string
  title: string
  description: string
}

interface IssueResponse {
  status: string
  message: string
  code: number
  data: {
    issue_id: number
    request_id: string
    revised_issue_title: string
    revised_issue_description: string
    additional_information_needed: string
  }
}

/**
 * Fetcher function to handle POST requests to the issue API
 */
async function postIssue(
  url: string,
  { arg }: { arg: IssueRequest }
): Promise<IssueResponse> {
  const { location, title, description } = arg

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        location: "Hong Kong",
        title: "test title",
        description: "test description",
      }),
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

/**
 * Custom hook for interacting with the issue API
 */
export function useIssue() {
  const { trigger, data, error, isMutating } = useSWRMutation(
    "http://localhost:8000/api/issue",
    postIssue
  )

  /**
   * Submit an issue to the API
   * @param location - The location of the issue
   * @param title - The title of the issue
   * @param description - The description of the issue
   */
  const submitIssue = async (
    location: string,
    title: string,
    description: string
  ) => {
    return trigger({ location, title, description })
  }

  return {
    submitIssue,
    data,
    error,
    isLoading: isMutating,
  }
}

/**
 * Hook to fetch a specific issue by ID
 * This is an additional utility if you need to fetch existing issues
 */
export function useIssueById(issueId: string | null) {
  const fetcher = async (url: string) => {
    const res = await fetch(url)
    if (!res.ok) {
      throw new Error("Failed to fetch issue")
    }
    return res.json()
  }

  const { data, error, isLoading } = useSWR(
    issueId ? `http://localhost:8000/api/issue/${issueId}` : null,
    fetcher
  )

  return {
    issue: data,
    isError: error,
    isLoading,
  }
}
