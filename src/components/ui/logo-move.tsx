import { useEffect, useState } from "react"
import Image from "next/image"

const logos = [
  "/svg/react.svg",
  "/svg/next.svg",
  "/svg/python.svg",
  "/svg/kong.svg",
  "/svg/gcp.svg",
]

export default function LogoScroll() {
  const [isHovered, setIsHovered] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener("mousemove", handleMouseMove)

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
    }
  }, [])

  return (
    <section
      // from-[#ff80b5] via-slate-500 to-[#9089fc]
      className="relative overflow-hidden bg-[#ffffff] bg-gradient-to-r  py-20 dark:bg-[#0a0a0a]"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(255,255,255,0.2) 0%, transparent 60%)`,
          transition: "background-image 0.3s ease",
        }}
      />
      <div className="container relative z-10">
        <h2 className="mb-12 text-center text-4xl font-bold tracking-wide text-gray-700 dark:text-white">
          Power by platform
        </h2>
        <div className="relative w-full overflow-hidden">
          <div className="animate-scroll flex space-x-16">
            {[...logos, ...logos].map((logo, index) => (
              <div
                key={index}
                className="flex h-40 w-40 flex-shrink-0 transform items-center justify-center rounded-lg bg-opacity-10 transition-all duration-300 hover:scale-110 hover:bg-opacity-20"
              >
                <Image
                  src={logo}
                  alt={`Logo ${(index % logos.length) + 1}`}
                  width={120}
                  height={60}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
