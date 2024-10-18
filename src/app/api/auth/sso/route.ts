import { NextResponse } from "next/server"

export async function GET(request: Request) {
  try {
    const headers = request.headers
    const headersObj: { [key: string]: string } = {}

    headers.forEach((value, key) => {
      headersObj[key] = value
    })

    const cookieHeader = headers.get("cookie")
    let authorization = null
    if (cookieHeader) {
      const cookies = Object.fromEntries(
        cookieHeader.split("; ").map((cookie) => cookie.split("="))
      )
      authorization = cookies["authorization"]
    }

    console.log("All Headers:", headersObj)

    const response = NextResponse.redirect(new URL("/401", request.url))

    if (authorization) {
      response.cookies.set({
        name: "access_token",
        value: JSON.stringify(headersObj),
        path: "/",
        httpOnly: true,
        secure: true,
        maxAge: 60 * 60 * 24,
      })
    }

    return response
  } catch (error) {
    return NextResponse.redirect(new URL("/401", request.url))
  }
}

export async function POST(request: Request) {
  try {
    const PUBLIC_APP_URL = process.env.NEXT_PUBLIC_APP_URL ?? "/"
    const headers = request.headers
    const headersObj: { [key: string]: string } = {}

    headers.forEach((value, key) => {
      headersObj[key] = value
    })

    const cookieHeader = headers.get("cookie")
    let authorization = null
    if (cookieHeader) {
      const cookies = Object.fromEntries(
        cookieHeader.split("; ").map((cookie) => cookie.split("="))
      )
      authorization = cookies["authorization"]
    }

    console.log("All Headers:", headersObj)

    const response = NextResponse.redirect(new URL(PUBLIC_APP_URL, request.url))

    if (authorization) {
      response.cookies.set({
        name: "access_token",
        value: JSON.stringify(headersObj),
        path: "/",
        httpOnly: true,
        secure: true,
        maxAge: 60 * 60 * 24,
      })
    }

    return response
  } catch (error) {
    return NextResponse.redirect(new URL("/401", request.url))
  }
}
