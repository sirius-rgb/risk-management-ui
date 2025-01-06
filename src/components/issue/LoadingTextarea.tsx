import React from "react"
import { SkeletonTextarea } from "@/components/issue/SkeletonTextarea"

const LoadingTextarea = () => {
  return (
    <>
      <SkeletonTextarea />
      <SkeletonTextarea />
      <SkeletonTextarea />
    </>
  )
}

export default LoadingTextarea