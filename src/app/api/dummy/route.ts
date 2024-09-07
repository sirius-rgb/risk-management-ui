import { NextResponse } from "next/server"

export async function GET() {
  const dummyData = [
    { id: 1, name: "Item 1" },
    { id: 2, name: "Item 2" },
    { id: 3, name: "Item 3" },
  ]

  return NextResponse.json(dummyData)
}
