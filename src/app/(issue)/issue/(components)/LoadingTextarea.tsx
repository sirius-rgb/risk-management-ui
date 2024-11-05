import React from "react"
import { SkeletonTextarea } from "@/app/(issue)/issue/(components)/SkeletonTextarea"

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