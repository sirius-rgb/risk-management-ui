import Link from "next/link"
import { Facebook, Github, Instagram, Twitter } from "lucide-react"

export default function Footer() {
  return (
    <footer className="container border-t bg-background text-foreground">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col items-center justify-between md:flex-row">
          <div className="mb-4 md:mb-0">
            <p className="text-sm">
              &copy; 2024 Your Company. All rights reserved.
            </p>
          </div>
          <div className="flex space-x-4">
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground hover:text-primary"
            >
              <Github size={20} aria-hidden="true" />
              <span className="sr-only">GitHub</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
