import type { PropsWithChildren } from "react"

import Header from "@/components/layout/header"

export default function IssueLayout({ children }: PropsWithChildren) {
  return (
    <>
      <Header />
      <main>{children}</main>
    </>
  )
}
