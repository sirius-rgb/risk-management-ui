import { Skeleton } from "@/components/ui/skeleton"
import * as React from "react"

export const SkeletonTextarea = () => (
  <div className="mb-4 space-y-4">
    <Skeleton className="h-4 w-[100px] animate-pulse bg-gray-300 dark:bg-gray-600" />
    <Skeleton className="h-20 w-full animate-pulse bg-gray-300 dark:bg-gray-600" />
  </div>
)