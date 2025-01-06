"use client"

import { motion } from "framer-motion"
import { Lightbulb, MonitorCheck, Rocket, Zap } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

const features = [
  {
    icon: Lightbulb,
    title: "Vulnerability Drafting",
    description:
      "Review and enhance an Operational Resilience Vulnerability description",
    badge: "Not available now",
  },
  {
    icon: Zap,
    title: "Issue Thematic Analysis",
    description: "Analyse and suggest themes in the causes of issues",
    badge: "Not available now",
  },
  {
    icon: Rocket,
    title: "Control Assessment Drafting",
    description:
      "Draft control effectiveness rationale based on associated issues",
    badge: "Not available now",
  },
  {
    icon: MonitorCheck,
    title: "Control Monitoring",
    description: "Grow your projects effortlessly with our scalable solutions.",
    badge: "Not available now",
  },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3,
    },
  },
}

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 100,
    },
  },
}

export default function FeatureSection() {
  return (
    <section className="bg-background py-12 lg:py-24">
      <div className="container mx-auto px-36">
        <motion.h2
          className="mb-12 text-center text-2xl font-bold text-primary md:text-4xl"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Additional functionality planned for 2025 release
        </motion.h2>
        <motion.div
          className="grid grid-cols-1 gap-8 md:grid-cols-3"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {features.map((feature, index) => (
            <motion.div key={index} variants={itemVariants}>
              <Card className="h-full cursor-pointer transition-shadow hover:shadow-lg">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <feature.icon className="h-8 w-8 text-primary" />
                    <Badge variant="secondary">{feature.badge}</Badge>
                  </div>
                  <CardTitle className="mt-4">{feature.title}</CardTitle>
                  <CardDescription>{feature.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <motion.button
                    // className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    disabled={true}
                  >
                    <Button disabled={true}>Draft</Button>
                  </motion.button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
