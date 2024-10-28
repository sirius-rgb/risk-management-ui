"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"

import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

const items = [
  {
    title: "Innovative Design",
    description: "Pushing the boundaries of what's possible in web design.",
    badge: "Design",
  },
  {
    title: "Seamless Integration",
    description: "Effortlessly connect with your existing tools and workflows.",
    badge: "Tech",
  },
  {
    title: "Performance Optimized",
    description: "Lightning-fast load times and smooth interactions.",
    badge: "Speed",
  },
  {
    title: "Scalable Architecture",
    description:
      "Built to grow with your business, from startup to enterprise.",
    badge: "Scale",
  },
  {
    title: "AI-Powered Insights",
    description:
      "Harness the power of machine learning for smarter decision making.",
    badge: "AI",
  },
  {
    title: "24/7 Support",
    description: "Round-the-clock assistance from our expert team.",
    badge: "Support",
  },
]

export default function MultiColumnScroll() {
  const targetRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start end", "end start"],
  })

  return (
    <section ref={targetRef} className="overflow-hidden bg-background py-24">
      <div className="container mx-auto px-4">
        <motion.h2
          className="mb-12 text-center text-3xl font-bold text-primary md:text-4xl"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Discover Our Unique Features
        </motion.h2>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {items.map((item, index) => {
            // 为每个卡片设置不同的滚动速度和方向
            const yTransform = useTransform(
              scrollYProgress,
              [0, 1],
              [
                50 * (index % 2 === 0 ? 1 : -1),
                -50 * (index % 2 === 0 ? 1 : -1),
              ]
            )
            const xTransform = useTransform(
              scrollYProgress,
              [0, 1],
              [0, -100 * (index % 3)]
            )

            return (
              <motion.div
                key={index}
                style={{
                  y: yTransform,
                  x: xTransform,
                }}
                className="transition-transform duration-500 ease-in-out"
              >
                <Card className="h-full transition-shadow hover:shadow-lg">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <Badge variant="secondary">{item.badge}</Badge>
                    </div>
                    <CardTitle className="mt-4">{item.title}</CardTitle>
                    <CardDescription>{item.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <motion.button
                      className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Learn More
                    </motion.button>
                  </CardContent>
                </Card>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
