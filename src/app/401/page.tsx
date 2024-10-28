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
          <h1 className="text-3xl font-bold text-gray-900">401 Unauthorized</h1>
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
          <CardContent>
            <p className="text-center text-sm text-muted-foreground">
              If you believe you should have access to this page, please contact
              our engineer:
              <a
                className="block whitespace-pre-wrap break-words px-2 text-red-500"
                href="mailto:keqing@qq.com,keqing@gmail.com?subject=Support Request&body=Please describe your issue here."
              >
                Keqing
              </a>
            </p>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
