// import { env } from "@/env.mjs"

export const siteConfig = {
  title: "Lorem Ipsum Dolor",
  description:
    "lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris ",
}

export const features = [
  {
    title: "Issue Creation",
    href: "/issue",
    content: `Assist in issue creation to the framework requirements`,
    name: "create",
    available: true,
  },
  {
    title: "Vulnerability drafting",
    href: "/review-issue",
    content: `Review and enhance an Operational Resilence Vulnerability description`,
    name: "Draft",
    available: false,
  },
  {
    title: "Issue Thematic Analysis",
    href: "/review-issue",
    content: `Analyse and suggest themes in the causes of issues`,
    name: "Draft",
    available: false,
  },
  {
    title: "Control Assessment Drafting",
    href: "/review-issue",
    content: `Draft control effectiveness rationable based on assosiated issues`,
    name: "Draft",
    available: false,
  },
  {
    title: "Control Monitoring Drafting",
    href: "/review-issue",
    content: `Draft the control monitoring description considering linked issues and KCIs`,
    name: "Draft",
    available: false,
  },
]

export const logos = [
  "/svg/react.svg",
  "/svg/next.svg",
  "/svg/python.svg",
  "/svg/kong.svg",
  "/svg/gcp.svg",
]
