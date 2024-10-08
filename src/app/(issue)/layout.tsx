import type { PropsWithChildren } from "react"

import Footer from "@/components/layout/footer"
// import Header from "@/components/layout/header"
import Header from "@/components/layout/header/header"

export default function IssueLayout({ children }: PropsWithChildren) {
  return (
    <>
      <Header />
      <main>{children}</main>
      {/* <Footer /> */}
    </>
  )
}
