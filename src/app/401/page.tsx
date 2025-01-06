import Link from "next/link"
import { AlertCircle } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export default function UnauthorizedPage() {
  return (
    <div className="flex min-h-screen flex-col bg-gray-100">
      <header className="bg-white shadow">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <Link href="/">
            <h1 className="text-2xl font-bold text-gray-900">LOGO</h1>
          </Link>
        </div>
      </header>
      <main className="flex flex-grow items-center justify-center px-4">
        <Card className="w-full max-w-md">
          <CardHeader>
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-red-100">
              <AlertCircle className="h-8 w-8 text-red-600" />
            </div>
            <CardTitle className="text-center">401 - Unauthorized</CardTitle>
            <CardDescription className="text-center">
              Oops! It seems you're trying to access a restricted area.
            </CardDescription>
          </CardHeader>
          <CardContent></CardContent>
        </Card>
      </main>
    </div>
  )
}
