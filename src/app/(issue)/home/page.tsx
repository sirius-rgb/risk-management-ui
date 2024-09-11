"use client"

import { useRouter } from "next/navigation"

import { Button } from "@/components/ui/button"
import { Icons } from "@/components/icons"

export default function Page() {
  const router = useRouter()
  const heros = [
    {
      title: "Issue Creation",
      href: "/create",
      content: `Assist in issue creation to the framework requirements`,
      name: "create",
    },
    {
      title: "Issue Review",
      href: "/review",
      content: `Assist in issue creation to the framework requirements`,
      name: "review",
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
  return (
    <>
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
              <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-6xl">
                What do you need help with?
              </h1>
              <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-400">
                Select the task that you need help with
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
      <section className="m-auto mt-4 p-4 sm:px-16">
        <div className="mx-auto grid w-full grid-cols-1 gap-4 sm:grid-cols-2">
          {heros.map((hero, index) => (
            <a
              key={index}
              href={hero.href}
              className="group flex flex-col items-center rounded-lg border border-transparent px-5 py-4 text-center transition-colors hover:border-gray-300 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30 sm:block sm:items-start sm:text-left"
            >
              <h2 className="mb-3 text-2xl font-semibold">{hero.title}</h2>
              <p className="mb-3 max-w-[30ch] opacity-50 dark:text-gray-200">
                {hero.content}
              </p>
              <Button
                className="relative z-10"
                onClick={(e) => {
                  e.preventDefault()
                  router.push(hero.href)
                }}
              >
                {hero.name}
              </Button>
            </a>
          ))}
        </div>
      </section>
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
    </>
  )
}
