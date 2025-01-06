"use client"

import { useRouter } from "next/navigation"
import { useStore } from "@/store"
import { toast } from "sonner"

import { hero_description, hero_title } from "@/lib/conts"
import { Button } from "@/components/ui/button"
import { Container } from "@/components/layout"
import Header from "@/components/layout/header"
import FeatureSection from "@/components/section/featureSection"
import HeroSection from "@/components/section/heroSection"
import ScrollingLogo from "@/components/section/scrollingLogo"
import TabsSection from "@/components/section/tabsSection"
import { Icons } from "@/components/shared/icons"

export default function Page() {
  return (
    <Container>
      <Header />
      <HeroSection />
      <FeatureSection />
      <ScrollingLogo />

      <TabsSection />
    </Container>
  )
}
