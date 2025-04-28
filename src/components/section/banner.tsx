import React from "react"

export default function Banner() {
  return (
    <>
      {/* <div className="z-2 absolute left-1/4 top-20 -translate-x-1/2 transform rounded-full border-[500px] border-b-blue-400 border-l-violet-600 border-r-pink-500 border-t-purple-400 blur-[240px]"></div>
      <div className="z-2 absolute right-[25vw] top-[50vh] rounded-full border-[300px] border-b-cyan-400 border-l-rose-600 border-r-indigo-500 border-t-blue-400 blur-[200px]"></div> */}

      <div
        className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
        aria-hidden="true"
      >
        <div className="blur-blob blur-blob-1" />
        <div className="blur-blob blur-blob-2" />
        <div className="blur-blob blur-blob-3" />
        <div className="blur-blob blur-blob-4" />
      </div>
    </>
  )
}
