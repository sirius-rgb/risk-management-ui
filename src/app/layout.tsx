import "@/styles/globals.css"

import type { Viewport } from "next"
import { Inter } from "next/font/google"

import { cn } from "@/lib/utils"
import { Toaster } from "@/components/ui/sonner"
import { ThemeProvider } from "@/components/shared/theme-provider"

const inter = Inter({ subsets: ["latin"] })

interface RootLayoutProps {
  children: React.ReactNode
}

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
}

export default async function RootLayout({ children }: RootLayoutProps) {
  return (
    <>
      <html lang="en" suppressHydrationWarning>
        <body
          className={cn(
            "min-h-screen bg-background antialiased",
            inter.className
          )}
        >
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {children}
            <Toaster closeButton richColors />
          </ThemeProvider>
        </body>
      </html>
    </>
  )
}
