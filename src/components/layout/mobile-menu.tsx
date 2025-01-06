import React from "react"
import { useRouter } from "next/navigation"

const MobileMenu = () => {
  const router = useRouter()
  return (
    <div className="mt-2 space-y-2 text-center text-gray-900 hover:cursor-pointer md:hidden">
      <a
        onClick={() => router.push("/issue")}
        className="block rounded py-2 pl-3 pr-4 text-gray-900 hover:bg-gray-100 dark:border-gray-700 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:p-0 md:hover:bg-transparent md:hover:text-blue-700 md:dark:hover:bg-transparent md:dark:hover:text-blue-500"
      >
        Create Issue
      </a>
    </div>
  )
}

export default MobileMenu
