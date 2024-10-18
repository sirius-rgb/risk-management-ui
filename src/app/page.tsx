"use client"

import { useRouter } from "next/navigation"
import { useStore } from "@/store"
import { toast } from "sonner"

import { hero_description, hero_title } from "@/lib/conts"
import { Button } from "@/components/ui/button"
import { Icons } from "@/components/icons"
import { Container } from "@/components/layout/container"
// import Header from "@/components/layout/header"
import Header from "@/components/layout/header/header"

const heros = [
  {
    title: "Issue Creation",
    href: "/issue",
    content: `Assist in issue creation to the framework requirements`,
    name: "create",
  },
  {
    title: "Issue Review",
    href: "/review-issue",
    content: `Assist in issue creation to the framework requirements`,
    name: "review",
  },
  {
    title: "Vulnerability drafting",
    href: "/review-issue",
    content: `Review and enhance an Operational Resilence Vulnerability description`,
    name: "Draft",
  },
  {
    title: "Issue Thematic Analysis",
    href: "/review-issue",
    content: `Analyse and suggest themes in the causes of issues`,
    name: "Draft",
  },
  {
    title: "Control Assessment Drafting",
    href: "/review-issue",
    content: `Draft control effectiveness rationable based on assosiated issues`,
    name: "Draft",
  },
  {
    title: "Control Monitoring Drafting",
    href: "/review-issue",
    content: `Draft the control monitoring description considering linked issues and KCIs`,
    name: "Draft",
  },
]

const tasks = [
  {
    icon: <Icons.globe />,
    title: "Control Review",
    content: `Body text for whatever you'd like to say.Add main takeaway
              points, quotes, anecdotes, or even a very very short story.`,
  },
  {
    icon: <Icons.user />,
    title: "Control Creation",
    content: `Body text for whatever you'd like to say.Add main takeaway
              points, quotes, anecdotes, or even a very very short story.`,
  },
  {
    icon: <Icons.lock />,
    title: "Risk Assessment Review",
    content: `Body text for whatever you'd like to say.Add main takeaway
              points, quotes, anecdotes, or even a very very short story.`,
  },
  {
    icon: <Icons.calendar />,
    title: "Control Assessment Drafting",
    content: `Body text for whatever you'd like to say.Add main takeaway
              points, quotes, anecdotes, or even a very very short story.`,
  },
]

export default function Page() {
  return (
    <Container>
      <Header />
      {/* <Header /> */}
      <Hero />
      <Tabs />
      {/* <Tasks /> */}
    </Container>
  )
}

const Hero = () => {
  return (
    <section className="m-auto mt-4 p-4 sm:px-16">
      <div className="relative isolate px-6 pt-6 lg:px-8">
        <div
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
        </div>
        <div className="mx-auto max-w-2xl py-24 sm:py-28 lg:py-32">
          <div className="text-center">
            <h1 className="text-wrap text-2xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl md:text-nowrap md:text-6xl">
              {hero_title}
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-400">
              {hero_description}
            </p>
          </div>
        </div>
        <div
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
        </div>
      </div>
    </section>
  )
}

const Tabs = () => {
  const isLoggedIn = useStore((state) => state.isLoggedIn)
  const router = useRouter()
  return (
    <section className="m-auto mt-4 p-4 sm:px-16">
      <div className="mx-auto grid w-full grid-cols-1  gap-4 sm:grid-cols-2">
        {heros.map((hero, index) => (
          <a
            key={index}
            className="group relative flex flex-col place-items-center items-center justify-center rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30 sm:block sm:items-start sm:text-left"
          >
            <h2 className="relative z-40 mb-3 text-center text-2xl font-semibold">
              {hero.title}
            </h2>
            <p className="mx-auto mb-3 max-w-[30ch] text-center opacity-50 dark:text-gray-200">
              {hero.content}
            </p>
            <Button
              className="mx-auto block text-center"
              disabled={hero.name === "create" ? false : true}
              {...(isLoggedIn
                ? { onClick: () => router.push(hero.href) }
                : {
                    onClick: () => toast("Please Login to access this feature"),
                  })}
            >
              {hero.name}
            </Button>
            {hero.name === "create" ? null : (
              <Icons.lock className="absolute right-[45%] top-[20%] -z-10 h-16 w-16 text-gray-200 dark:text-gray-800" />
            )}
          </a>
        ))}
      </div>
    </section>
  )
}

const Tasks = () => {
  return (
    <section className="m-auto p-4 sm:px-16">
      <h2 className="mb-4 text-center text-xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-left sm:text-2xl">
        Other Tasks
      </h2>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {tasks.map((task, index) => (
          <a
            key={index}
            className="group flex cursor-pointer flex-col items-center rounded-lg border border-transparent px-5 py-4 text-center transition-colors hover:border-gray-300 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30 sm:block sm:items-start sm:text-left"
          >
            <div className="sm:inline-block">{task.icon}</div>
            <h5 className="my-2 text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
              {task.title}
            </h5>
            <p className="mb-3 font-normal text-gray-500 dark:text-gray-400">
              {task.content}
            </p>
          </a>
        ))}
      </div>
    </section>
  )
}
