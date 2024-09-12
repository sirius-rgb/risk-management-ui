import { PropsWithChildren } from "react"

import { Toaster } from "@/components/ui/sonner"
import Footer from "@/components/layout/footer"
import Header from "@/components/layout/header"

export default function DefaultLayout({ children }: PropsWithChildren) {
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
      <Toaster />
    </>
  )
}
