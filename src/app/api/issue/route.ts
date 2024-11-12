import { NextResponse } from "next/server"
import { PrismaClient } from "@prisma/client"
import { customAlphabet } from "nanoid"

const prisma = new PrismaClient()

const nanoid = customAlphabet("0123456789", 9)
const nanoidStr = customAlphabet("abcdefghjklimnuvwxyz", 10)

export async function POST(request: Request) {
  try {
    await new Promise((resolve) => setTimeout(resolve, 2000))

    throw new Error()

    const { issue_title, issue_description } = await request.json()
    const issue_id = `R-${nanoid()}`
    const request_id = nanoid()

    return NextResponse.json({
      status: "Success",
      message: "Issue created successfully",
      code: null,
      data: {
        issue_id: issue_id ?? nanoid(6),
        request_id,
        revised_issue_title: `TM Operations: Quality of Case Analysis - ${nanoid(6)}`,
        revised_issue_description:
          "Condition - Lorem ipsum\nCriteria - Dolor sit amet\nCause - Consectetur adipiscing\nConsequence - Elit sed do eiusmod\nContext - Tempor incididunt",
        additional_information_needed:
          "1. What is the specific impact on operations?\n2. How frequently does this issue occur?\n3. Are there any existing controls in place?",
      },
    })
  } catch (error) {
    console.error(error)
    return NextResponse.json(
      {
        status: "fail",
        message:
          // "400 Bad Request",
          // "403 Unauthorized",
          // "429 The LLM service is currently unavailable. Please try again 10s later.",
          "500 Request timeout",
        // "500 Request timeout",
        // "504 Bad Gateway",
        data: null,
        // code: 400,
        // code: 403,
        code: 4029,
        // code: 5000,
        // code: 5004,
      },
      { status: 429 }
    )
  } finally {
    await prisma.$disconnect()
  }
}
