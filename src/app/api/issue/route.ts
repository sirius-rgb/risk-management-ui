import { NextResponse } from "next/server"
import { PrismaClient } from "@prisma/client"
import { customAlphabet } from "nanoid"

const prisma = new PrismaClient()

const nanoid = customAlphabet("0123456789", 9)
const nanoidStr = customAlphabet("abcdefghjklimnuvwxyz", 10)

export async function GET() {
  try {
    await new Promise((resolve) => setTimeout(resolve, 3000))

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

// export async function POST(req) {
//   const { issue_title, issue_desc } = req.body
//   try {
//     const issue = await prisma.issue.create({
//       data: {
//         issue_title,
//         issue_desc,
//       },
//     })
//     return NextResponse.json(issue)
//   } catch (error) {
//     console.error("创建问题失败:", error)
//     return NextResponse.json({ error: "创建问题失败" }, { status: 500 })
//   } finally {
//     await prisma.$disconnect()
//   }
// }
