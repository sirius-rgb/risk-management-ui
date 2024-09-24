import { SiteConfig } from "@/types"

import { env } from "@/env.mjs"

export const siteConfig: SiteConfig = {
  name: "Copilot UI",
  author: "keqing77",
  description: "AI Assistant",
  keywords: ["Next.js", "React", "Tailwind CSS", "Radix UI", "shadcn/ui"],
  url: {
    base: env.NEXT_PUBLIC_APP_URL,
    // base: process.env.NEXT_PUBLIC_APP_URL || "",
    author: "https://bento.me/keqing",
  },
  links: {
    github: "https://github.com/keqing77/risk-management-ui",
  },
  ogImage: `${env.NEXT_PUBLIC_APP_URL}/og.jpg`,
}
