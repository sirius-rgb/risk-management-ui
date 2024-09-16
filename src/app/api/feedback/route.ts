import { NextResponse } from "next/server"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export async function POST(request: Request) {
  try {
    const { request_id, response_score, feedback } = await request.json()

    const newFeedback = await prisma.feedback.create({
      data: {
        request_id,
        response_score,
        feedback,
      },
    })

    return NextResponse.json(
      { status: "Success", data: newFeedback },
      { status: 201 }
    )
  } catch (error) {
    console.error(error)
    return NextResponse.json(
      { status: "Error", error: "create feedback failed" },
      { status: 500 }
    )
  } finally {
    await prisma.$disconnect()
  }
}
