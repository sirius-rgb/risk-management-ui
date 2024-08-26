"use client"

import { useRouter } from "next/navigation"

import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

export default function Page() {
  const router = useRouter()
  return (
    <section className="m-auto mt-8 p-8 sm:px-16">
      <h2 className="text-4xl font-semibold text-gray-900">Issue Reivew</h2>
      <p className="my-4 text-xl text-gray-600">
        Please input the Issue ID of the issue you would like to review
      </p>
      <Label htmlFor="review">Issue ID</Label>
      <Textarea
        id="review"
        className="mb-4 mt-2 min-h-4"
        placeholder="I-123456789"
      />
      <Button
        className="mb-4 mt-2 max-h-12 w-96"
        onClick={() => router.push("/review-detail")}
      >
        Review
      </Button>
    </section>
  )
}
