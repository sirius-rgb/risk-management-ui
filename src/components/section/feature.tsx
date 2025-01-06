"use client"

import { useRouter } from "next/navigation"
import { useStore } from "@/store"
import { motion } from "framer-motion"
import { toast } from "sonner"

import { features } from "@/config/site"
import { Button } from "@/components/ui/button"
import { Icons } from "@/components/shared/icons"

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
}

const item = {
  hidden: { y: 20, opacity: 0 },
  show: { y: 0, opacity: 1 },
}

export default function Feature() {
  const isLoggedIn = useStore((state) => state.isLoggedIn)
  const router = useRouter()

  const availableFeatures = features.filter((f) => f.available)
  const upcomingFeatures = features.filter((f) => !f.available)

  return (
    <section className="m-auto sm:px-16">
      <div className="relative isolate px-6 lg:px-8">
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="mx-auto max-w-6xl space-y-16"
        >
          {/* 可用功能 */}
          <div>
            <h3 className="mb-8 text-center text-2xl font-bold">
              Available Features
            </h3>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-1">
              {availableFeatures.map((feature, index) => (
                <motion.div
                  key={index}
                  variants={item}
                  whileHover={{ scale: 1.02 }}
                  className="relative flex h-full flex-col items-center justify-between rounded-lg border p-6 transition-colors hover:border-gray-300 hover:shadow-lg"
                >
                  <div className="flex flex-col items-center">
                    <h2 className="mb-3 text-2xl font-semibold">
                      {feature.title}
                    </h2>
                    <p className="mb-4 text-center text-muted-foreground">
                      {feature.content}
                    </p>
                  </div>
                  <Button
                    onClick={() =>
                      isLoggedIn
                        ? router.push(feature.href)
                        : toast("Please Login to access this feature")
                    }
                  >
                    {feature.name}
                  </Button>
                </motion.div>
              ))}
            </div>
          </div>

          {/* 即将推出的功能 */}
          <div>
            <h3 className="mb-8 text-center text-2xl font-bold">Coming Soon</h3>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              {upcomingFeatures.map((feature, index) => (
                <motion.div
                  key={index}
                  variants={item}
                  whileHover={{ scale: 1.02 }}
                  className="relative flex flex-col place-items-center rounded-lg border border-dashed bg-muted/50 p-6"
                >
                  <Icons.lock className="absolute right-4 top-4 h-6 w-6 text-muted-foreground" />
                  <h2 className="mb-3 text-2xl font-semibold text-muted-foreground">
                    {feature.title}
                  </h2>
                  <p className="mb-4 text-center text-muted-foreground">
                    {feature.content}
                  </p>
                  <Button disabled variant="outline">
                    Coming Soon
                  </Button>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
