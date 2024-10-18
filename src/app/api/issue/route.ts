import { NextResponse } from "next/server"
import { PrismaClient } from "@prisma/client"
import { customAlphabet } from "nanoid"

const prisma = new PrismaClient()

const nanoid = customAlphabet("0123456789", 9)
const nanoidStr = customAlphabet("abcdefghjklimnuvwxyz", 10)

export async function GET() {
  try {
    await new Promise((resolve) => setTimeout(resolve, 1500))

    const mockIssue = {
      issue_id: `R-${nanoid(9)}`,
      request_id: nanoid(),
      revised_issue_title: "TM Operations: Quality of Case Analysis",
      revised_issue_description: `Condition - ${nanoidStr()} 
Criteria - ${nanoidStr()}
Cause - ${nanoidStr()}
Consequence - ${nanoidStr()}
Context - ${nanoidStr()}`,
      additional_information_needed: `
1. ${nanoidStr()}?
2. ${nanoidStr()}?
3. ${nanoidStr()}?
`,
    }
    return NextResponse.json({
      status: "Success",
      data: mockIssue,
    })
  } catch (error) {
    console.error(error)
    return NextResponse.json(
      { status: "Error", error: "v1/issue failed" },
      { status: 500 }
    )
  } finally {
    await prisma.$disconnect()
  }
}

export async function POST(request: Request) {
  // await new Promise((resolve) => setTimeout(resolve, 500))

  const { issue_title, issue_description } = await request.json()
  console.log(issue_title, issue_description)

  const issue_id = `R-${nanoid()}`
  const request_id = nanoid()

  return NextResponse.json({
    status: "Success",
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
}
