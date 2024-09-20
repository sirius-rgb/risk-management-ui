"use client"

import { useEffect } from "react"

export function ConsoleWarningSuppress() {
  useEffect(() => {
    const originalWarn = console.warn.bind(console.warn)
    console.warn = (...args) => {
      if (
        args[0].includes(
          "Skipping auto-scroll behavior due to `position: sticky`"
        )
      ) {
        return
      }
      originalWarn(...args)
    }

    return () => {
      console.warn = originalWarn
    }
  }, [])

  return null
}
