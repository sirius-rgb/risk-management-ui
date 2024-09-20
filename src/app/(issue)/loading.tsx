import React from "react"

export default function Loading() {
  return (
    <div className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-gray-100 bg-opacity-50">
      <div className="mb-4 h-32 w-32 animate-spin rounded-full border-b-2 border-t-2 border-blue-500"></div>
      <p className="text-xl font-semibold text-blue-500">Loading...</p>
    </div>
  )
}
