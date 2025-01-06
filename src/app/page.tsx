"use client"

import { useEffect } from "react"
import Lenis from "@studio-freight/lenis"

import Header from "@/components/layout/header"
import Feature from "@/components/section/feature"
import Gallery from "@/components/section/gallery"
import Hero from "@/components/section/hero"
import Logo from "@/components/section/logo"

export default function Page() {
  useEffect(() => {
    const lenis = new Lenis()

    function raf(time: number) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)
  }, [])

  return (
    <>
      <Header />
      <Hero />
      <Feature />
      <Gallery />
      <Logo />
      {/* <Scrolling /> */}
    </>
  )
}
