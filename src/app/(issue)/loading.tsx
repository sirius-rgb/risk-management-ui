import React from "react"

export default function Loading() {
  // layout-router.js:110 Skipping auto-scroll behavior due to `position: sticky` or `position: fixed` on element:
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-gray-100 bg-opacity-50">
      <div className="mb-4 h-32 w-32 animate-spin rounded-full border-b-2 border-t-2 border-blue-500"></div>
      <p className="text-xl font-semibold text-blue-500">Loading...</p>
    </div>
  )
}
