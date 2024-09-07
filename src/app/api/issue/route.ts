import { NextResponse } from "next/server"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export async function GET() {
  try {
    const issues = await prisma.issue.findMany({
      take: 10, // 限制返回10条数据
    })

    return NextResponse.json(issues)
  } catch (error) {
    console.error("获取问题失败:", error)
    return NextResponse.json({ error: "获取问题失败" }, { status: 500 })
  } finally {
    await prisma.$disconnect()
  }
}
