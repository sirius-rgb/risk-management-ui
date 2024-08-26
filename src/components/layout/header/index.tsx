"use client"

import { useState } from "react"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { ModeToggle } from "@/components/mode-toggle"

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)

  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }
  return (
    <nav className="sticky top-0 z-10 border-b border-gray-200 bg-white bg-opacity-30 backdrop-blur-lg backdrop-filter">
      <div className="max-w-8xl mx-12 px-4 ">
        <div className="flex h-16 items-center justify-between gap-64">
          <div className=" text-2xl font-semibold text-gray-900">
            <a className="cursor-pointer" href="/home">
              SECRET AI Assistant
            </a>
          </div>
          <div className="items-center justify-center text-gray-900 sm:hidden md:flex md:space-x-2 lg:space-x-4  ">
            <a href="/">Login</a>
            <a href="/issue">Issue</a>
            <a href="/chat">Chat</a>
            <Button>
              <Link href="/home">Home</Link>
            </Button>
            <ModeToggle />
          </div>
          <div className="flex items-center md:hidden">
            <Button onClick={toggleMenu}>
              {/* You can replace this with an icon */}☰
            </Button>
          </div>
        </div>
        {/* Mobile menu */}
        {isOpen && (
          <div className="mt-2 space-y-2 text-center text-gray-900 md:hidden">
            <a
              href="#"
              className="block rounded py-2 pl-3 pr-4 text-gray-900 hover:bg-gray-100 dark:border-gray-700 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:p-0 md:hover:bg-transparent md:hover:text-blue-700 md:dark:hover:bg-transparent md:dark:hover:text-blue-500"
            >
              Login
            </a>
            <a
              href="#"
              className="block rounded py-2 pl-3 pr-4 text-gray-900 hover:bg-gray-100 dark:border-gray-700 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:p-0 md:hover:bg-transparent md:hover:text-blue-700 md:dark:hover:bg-transparent md:dark:hover:text-blue-500"
            >
              About
            </a>
            <a
              href="#"
              className="block rounded py-2 pl-3 pr-4 text-gray-900 hover:bg-gray-100 dark:border-gray-700 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:p-0 md:hover:bg-transparent md:hover:text-blue-700 md:dark:hover:bg-transparent md:dark:hover:text-blue-500"
            >
              Chat
            </a>
          </div>
        )}
      </div>
    </nav>
  )
}
