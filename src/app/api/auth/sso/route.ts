// import { cookies } from "next/headers"
import { NextResponse } from "next/server"

export async function POST(request: Request, response: Response) {
  try {
    const body = await request.text()
    const fromData: any = {}

    decodeURIComponent(body)
      .split("&")
      .map((x) => {
        const data = x.split("=")
        fromData[data[0]] = data[1]
      })

    const access_token = fromData["access_token"]
    const headers = await request.headers
    const userInfo = {
      name: headers.get("x-user-name"),
      mail: headers.get("x-user-mail"),
      country: headers.get("x-user-country"),
      title: headers.get("x-user-title"),
      department: headers.get("x-user-department"),
      id: headers.get("x-user-id"),
      role: headers.get("x-user-role"),
      // photo: headers.get("x-user-photo"),
    }

    const newRespHeaders = new Headers()
    newRespHeaders.set(
      "set-cookie",
      `access_token=${access_token}; Path=/; HttpOnly=false; Secure=false`
    )
    newRespHeaders.set(
      "set-cookie",
      `user_info=${JSON.stringify(userInfo)}; Path=/; HttpOnly=false; Secure=false`
    )
    newRespHeaders.append("Location", "/")

    return NextResponse.json("ok", {
      status: 302,
      headers: newRespHeaders,
    })
  } catch (error) {
    return NextResponse.json("Auth error", {
      status: 500,
    })
  }
}
