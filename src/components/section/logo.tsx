"use client"

import { useEffect, useRef } from "react"
import Image from "next/image"

const logos = [
  {
    src: "https://cruip-tutorials.vercel.app/logo-carousel/facebook.svg",
    alt: "Facebook",
  },
  {
    src: "https://cruip-tutorials.vercel.app/logo-carousel/disney.svg",
    alt: "Disney",
  },
  {
    src: "https://cruip-tutorials.vercel.app/logo-carousel/airbnb.svg",
    alt: "Airbnb",
  },
  {
    src: "https://cruip-tutorials.vercel.app/logo-carousel/apple.svg",
    alt: "Apple",
  },
  {
    src: "https://cruip-tutorials.vercel.app/logo-carousel/spark.svg",
    alt: "Spark",
  },
  {
    src: "https://cruip-tutorials.vercel.app/logo-carousel/samsung.svg",
    alt: "Samsung",
  },
  {
    src: "https://cruip-tutorials.vercel.app/logo-carousel/quora.svg",
    alt: "Quora",
  },
  {
    src: "https://cruip-tutorials.vercel.app/logo-carousel/sass.svg",
    alt: "Sass",
  },
]

const Logo = () => {
  const logoRef = useRef<HTMLUListElement>(null)

  useEffect(() => {
    if (logoRef.current) {
      const ul = logoRef.current
      const clone = ul.cloneNode(true) as HTMLElement
      clone.setAttribute("aria-hidden", "true")
      ul.parentNode?.appendChild(clone)
    }
  }, [])

  return (
    <div className="font-inter relative antialiased">
      <main className="relative flex min-h-screen flex-col justify-center overflow-hidden bg-background">
        <div className="mx-auto w-full max-w-5xl px-4 py-24 md:px-6">
          <div className="text-center">
            <div className="inline-flex w-full flex-nowrap overflow-hidden [mask-image:_linear-gradient(to_right,transparent_0,_black_128px,_black_calc(100%-128px),transparent_100%)]">
              <ul
                ref={logoRef}
                className="animate-infinite-scroll flex items-center justify-center md:justify-start [&_img]:max-w-none [&_li]:mx-8"
              >
                {logos.map((logo, index) => (
                  <li key={index}>
                    <Image
                      src={logo.src}
                      alt={logo.alt}
                      width={100}
                      height={40}
                      className="h-auto w-auto"
                    />
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default Logo
