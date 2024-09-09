import type { PropsWithChildren } from "react"
import { Inter } from "next/font/google"

import { cn } from "@/lib/utils"
import Footer from "@/components/layout/footer"
import Header from "@/components/layout/header"
import { ThemeProvider } from "@/components/theme-provider"

// const inter = Inter({ subsets: ["latin"] })

export default function Page({ children }: PropsWithChildren<unknown>) {
  return (
    // <html lang="en" suppressHydrationWarning>
    //   <head />
    //   <body
    //     className={cn(
    //       "min-h-screen bg-background antialiased",
    //       inter.className
    //     )}
    //   >
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <Header />
      {children}
      {/* <Footer /> */}
    </ThemeProvider>
    // </body>
    // </html>
  )
}
