"use client"

import useSWR from "swr"

import { Spinner } from "../../../components/ui/spinner"

// import { Spinner } from "@/components/ui/spinner"

interface Issue {
  id: number
  title: string
  content: string | null
  createdAt: string
  updatedAt: string
}

const fetcher = (url: string) => fetch(url).then((res) => res.json())

export default function ApiTestPage() {
  const {
    data: issues,
    error,
    isLoading,
  } = useSWR<Issue[]>("/api/issue", fetcher)

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100">
      <h1 className="mb-4 text-2xl font-bold">测试 API</h1>
      {isLoading ? (
        <Spinner />
      ) : error ? (
        <div className="text-red-500">加载失败: {error.message}</div>
      ) : issues ? (
        <div className="mt-4">
          <h2 className="mb-2 text-xl">获取到的 Issues:</h2>
          <pre className="rounded bg-white p-4 shadow">
            {JSON.stringify(issues, null, 2)}
          </pre>
        </div>
      ) : null}
    </div>
  )
}
