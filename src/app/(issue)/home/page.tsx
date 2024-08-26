"use client"

import { useRouter } from "next/navigation"

import { Button } from "@/components/ui/button"
import { Icons } from "@/components/icons"

export default function Page() {
  const router = useRouter()
  return (
    <>
      <section className="m-auto mt-4 p-4 sm:px-16">
        {" "}
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
              <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
                What do you need help with?
              </h1>
              <p className="mt-6 text-lg leading-8 text-gray-600">
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
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="max-w-sm cursor-pointer border-gray-200 bg-white p-6  hover:rounded-lg hover:border hover:shadow  dark:border-gray-700 dark:bg-gray-800">
            <a href="#">
              <h5 className="mb-2 text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">
                Issue Creation
              </h5>
            </a>
            <p className="mb-3 font-normal text-gray-500 dark:text-gray-400">
              Assist in issue creation according to the framework requirements
            </p>{" "}
            <Button onClick={() => router.push("/create")}>Create</Button>
          </div>
          <div className="max-w-sm cursor-pointer border-gray-200 bg-white p-6  hover:rounded-lg hover:border hover:shadow  dark:border-gray-700 dark:bg-gray-800">
            <a href="#">
              <h5 className="mb-2 text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">
                Issue Review
              </h5>
            </a>
            <p className="mb-3 font-normal text-gray-500 dark:text-gray-400">
              Assist in issue creation according to the framework requirements
            </p>
            <Button onClick={() => router.push("/review")}>Review</Button>
          </div>
        </div>
      </section>
      <section className="m-auto p-4 sm:px-16">
        <h2 className="mb-4 text-xl font-bold tracking-tight text-gray-900 sm:text-2xl">
          Other Tasks
        </h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="max-w-sm bg-white  p-6 hover:rounded-lg hover:border hover:border-gray-200  hover:shadow dark:border-gray-700 dark:bg-gray-800">
            <Icons.globe />
            <a href="#">
              <h5 className="my-2 text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
                Control Review
              </h5>
            </a>
            <p className="mb-3 font-normal text-gray-500 dark:text-gray-400">
              Body text for whatever you'd like to say.Add main takeaway points,
              quotes, anecdotes, or even a very very short story.
            </p>
          </div>
          <div className="max-w-sm bg-white  p-6 hover:rounded-lg hover:border hover:border-gray-200  hover:shadow dark:border-gray-700 dark:bg-gray-800">
            <Icons.user />
            <a href="#">
              <h5 className="my-2 text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
                Control Creation
              </h5>
            </a>
            <p className="mb-3 font-normal text-gray-500 dark:text-gray-400">
              Body text for whatever you'd like to say.Add main takeaway points,
              quotes, anecdotes, or even a very very short story.
            </p>
          </div>
          <div className="max-w-sm bg-white  p-6 hover:rounded-lg hover:border hover:border-gray-200  hover:shadow dark:border-gray-700 dark:bg-gray-800">
            <Icons.lock />
            <a href="#">
              <h5 className="my-2 text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
                Risk Assessment Review
              </h5>
            </a>
            <p className="mb-3 font-normal text-gray-500 dark:text-gray-400">
              Body text for whatever you'd like to say.Add main takeaway points,
              quotes, anecdotes, or even a very very short story.
            </p>
          </div>
          <div className="max-w-sm bg-white  p-6 hover:rounded-lg hover:border hover:border-gray-200  hover:shadow dark:border-gray-700 dark:bg-gray-800">
            <Icons.calendar />
            <a href="#">
              <h5 className="my-2 text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
                Control Assessment Drafting
              </h5>
            </a>
            <p className="mb-3 font-normal text-gray-500 dark:text-gray-400">
              Body text for whatever you'd like to say.Add main takeaway points,
              quotes, anecdotes, or even a very very short story.
            </p>
          </div>
        </div>
      </section>
    </>
  )
}
