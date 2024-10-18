import Link from "next/link"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

// import { Separator } from "@/components/ui/separator"

export default function TermsAndConditions() {
  return (
    <div className="flex min-h-screen flex-col">
      {/* <Header /> */}
      <main className="flex-1 py-6 md:py-12">
        <div className="container px-4 md:px-6">
          <div className="space-y-6">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Terms and Conditions
            </h1>
            <p className="pl-2 text-gray-500 dark:text-gray-400">
              Last updated: {new Date().toLocaleDateString()}
            </p>
            <Card>
              <CardHeader>
                <CardTitle>1. Acceptance of Terms</CardTitle>
              </CardHeader>
              <CardContent>
                <p>
                  By accessing or using our services, you agree to be bound by
                  these Terms and Conditions. If you do not agree to all the
                  terms and conditions, then you may not access the service.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>2. Changes to Terms</CardTitle>
              </CardHeader>
              <CardContent>
                <p>
                  We reserve the right to modify or replace these Terms at any
                  time. We will provide notice of any changes by posting the new
                  Terms on this page.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>3. Privacy Policy</CardTitle>
              </CardHeader>
              <CardContent>
                <p>
                  Your use of our service is also subject to our Privacy Policy.
                  Please review our Privacy Policy, which also governs your
                  visit to our website, to understand our practices.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>4. User Responsibilities</CardTitle>
              </CardHeader>
              <CardContent>
                <p>
                  You are responsible for safeguarding the password that you use
                  to access the service and for any activities or actions under
                  your password.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>5. Termination</CardTitle>
              </CardHeader>
              <CardContent>
                <p>
                  We may terminate or suspend access to our service immediately,
                  without prior notice or liability, for any reason whatsoever,
                  including without limitation if you breach the Terms.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}

const Header = () => {
  return (
    <header className="flex h-14 items-center px-4 lg:px-6">
      <Link className="flex items-center justify-center" href="/">
        <span className="sr-only">HSBC</span>
        <svg
          className=" h-6 w-6"
          fill="none"
          height="24"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          viewBox="0 0 24 24"
          width="24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
          <path d="M3 6h18" />
          <path d="M16 10a4 4 0 0 1-8 0" />
        </svg>
        <span className="ml-2 text-xl font-semibold">Acme Inc</span>
      </Link>
      <nav className="ml-auto flex gap-4 sm:gap-6">
        <Link
          className="text-sm font-medium underline-offset-4 hover:underline"
          href="#"
        >
          Home
        </Link>
        <Link
          className="text-sm font-medium underline-offset-4 hover:underline"
          href="#"
        >
          About
        </Link>
        <Link
          className="text-sm font-medium underline-offset-4 hover:underline"
          href="#"
        >
          Contact
        </Link>
      </nav>
    </header>
  )
}

const Footer = () => {
  return (
    <footer className="py-6 md:px-8 md:py-0">
      <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
        <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
          © 2024 HSBC. All rights reserved.
        </p>
        <nav className="flex gap-4 sm:gap-6">
          <Link
            className="text-sm font-medium underline-offset-4 hover:underline"
            href="#"
          >
            Terms of Service
          </Link>
          <Link
            className="text-sm font-medium underline-offset-4 hover:underline"
            href="#"
          >
            Privacy
          </Link>
        </nav>
      </div>
    </footer>
  )
}
