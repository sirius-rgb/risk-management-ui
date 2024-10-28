"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"

export default function HeroSection() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isHovering, setIsHovering] = useState(false)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = e.clientX / window.innerWidth
      const y = e.clientY / window.innerHeight
      setMousePosition({ x, y })
    }

    window.addEventListener("mousemove", handleMouseMove)

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
    }
  }, [])

  return (
    <section
      className="relative flex h-screen items-center justify-center overflow-hidden"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {isHovering && (
        <div
          className="absolute inset-0 z-0 bg-gradient-to-br from-primary/20 to-secondary/20 transition-opacity duration-300"
          style={{
            background: `radial-gradient(circle at ${mousePosition.x * 100}% ${mousePosition.y * 100}%, rgba(var(--primary-rgb), 0.3) 0%, rgba(var(--primary-rgb), 0.1) 25%, rgba(var(--secondary-rgb), 0.1) 50%, rgba(var(--secondary-rgb), 0) 75%)`,
            opacity: isHovering ? 1 : 0,
          }}
        />
      )}

      {/* Content container */}
      <div className="relative z-10 text-center">
        {/* Animated title */}
        <motion.h1
          className="mb-6 text-4xl font-bold text-primary md:text-6xl"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          Welcome to the Future
        </motion.h1>

        {/* Subtitle with typing effect */}
        <motion.p
          className="mb-8 text-xl text-muted-foreground md:text-2xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          Innovate. Create. Inspire.
        </motion.p>

        {/* CTA Button */}
        <motion.button
          className="rounded-full bg-primary px-8 py-3 text-lg font-semibold text-primary-foreground transition-all duration-300 ease-in-out hover:scale-105 hover:bg-primary/80 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Get Started
        </motion.button>
      </div>

      {/* Floating shapes */}
      {[...Array(5)].map((_, index) => (
        <motion.div
          key={index}
          className="absolute hidden h-16 w-16 rounded-full bg-primary/10 md:block"
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -10, 0],
            x: [0, 5, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            repeatType: "reverse",
            delay: index * 0.5,
          }}
        />
      ))}
    </section>
  )
}
