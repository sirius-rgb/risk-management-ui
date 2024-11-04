export type SiteConfig = {
  name: string
  author: string
  description: string
  keywords: Array<string>
  url: {
    base: string
    author: string
  }
  links: {
    github: string
  }
  ogImage: string
}

export interface Issue {
  issue_id?: string
  issue_title: string
  issue_description: string
  signal?: AbortSignal
}

export interface Feedback {
  request_id?: string
  score: number
  feedback: string
}

export const PLATFORM_LIST = ["azure", "gcp"]

export const PLATFORM_TYPE = "azure" | "gcp"

export const MODEL_LIST_AZURE = ["gpt-35-turbo", "gpt-4", "gpt-4-turbo"]

export const MODEL_LIST_GCP = ["chat-bison", "codechat-bison", "gemini-pro"]

export type Configuration = {
  platform: PLATFORM_TYPE
  deployment_name: string
  max_tokens: number
  temperature: number
  top_p: number
}
