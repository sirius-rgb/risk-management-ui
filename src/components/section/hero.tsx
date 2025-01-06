"use client"

import { motion } from "framer-motion"

import { siteConfig } from "@/config/site"

// 添加动画配置
const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3,
    },
  },
}

const item = {
  hidden: {
    y: -40,
    opacity: 0,
    scale: 0.9,
  },
  show: {
    y: 0,
    opacity: 1,
    scale: 1,
    transition: {
      type: "spring",
      bounce: 0.5,
      duration: 1,
    },
  },
}

// 添加背景动画
const backgroundAnimation = {
  hidden: {
    opacity: 0,
    scale: 0.8,
  },
  show: {
    opacity: 0.3,
    scale: 1,
    transition: {
      duration: 1.5,
      ease: "easeOut",
    },
  },
}

export default function Hero() {
  return (
    <section className="m-auto mt-4 bg-card py-16 sm:px-16">
      <div className="relative isolate px-6 pt-6 lg:px-8">
        <motion.div
          variants={backgroundAnimation}
          initial="hidden"
          animate="show"
          className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
          aria-hidden="true"
        >
          <div
            className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
            style={{
              clipPath:
                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
            }}
          ></div>
        </motion.div>
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="mx-auto max-w-2xl py-4"
        >
          <div className="text-center">
            <motion.h1
              variants={item}
              className="text-wrap text-2xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl md:text-nowrap md:text-6xl"
            >
              {siteConfig.title}
            </motion.h1>
            <motion.p
              variants={item}
              className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-400"
            >
              {siteConfig.description}
            </motion.p>
          </div>
        </motion.div>
        <motion.div
          variants={backgroundAnimation}
          initial="hidden"
          animate="show"
          className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
          aria-hidden="true"
        >
          <div
            className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
            style={{
              clipPath:
                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
            }}
          ></div>
        </motion.div>
      </div>
    </section>
  )
}
