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

export default function NotAuthorized() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 dark:bg-gray-900">
      <Card className="w-full max-w-md">
        <CardHeader>
          <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-red-100 dark:bg-red-900">
            <AlertCircle className="h-10 w-10 text-red-600 dark:text-red-300" />
          </div>
          <CardTitle className="text-center text-2xl font-bold text-gray-800 dark:text-gray-200">
            401 - Unauthorized
          </CardTitle>
          <CardDescription className="text-center text-gray-600 dark:text-gray-400">
            Oops! You don't have permission to access this page.
          </CardDescription>
        </CardHeader>
        <CardContent className="text-center">
          <p className="text-gray-700 dark:text-gray-300">
            It seems you're trying to access a restricted area. Please contact
            the site administrator for access.
          </p>
        </CardContent>
        <CardFooter className="flex justify-center">
          <Button asChild>
            <Link href="/">Go to Apply Access</Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
