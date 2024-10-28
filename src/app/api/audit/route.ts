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
    const id_token = fromData["id_token"]

    response.headers.set("Location", "/")

    response.headers.set("status", "302")

    response.headers.append(
      "Set-Cookie",
      `id_token=${id_token.toString()}; Path=/; HttpOnly=false; Secure=false`
    )
    return response
  } catch (error) {
    return NextResponse.redirect(new URL("/401", request.url))
  }
}
