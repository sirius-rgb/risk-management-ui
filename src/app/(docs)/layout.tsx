import type { PropsWithChildren } from "react"

import { Container } from "@/components/layout/container"

export default function IssueLayout({ children }: PropsWithChildren) {
  return <Container>{children}</Container>
}
