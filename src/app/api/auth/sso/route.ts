import { cookies } from "next/headers"
import { NextResponse } from "next/server"

// export async function GET(request: Request) {
//   try {
//     const headers = request.headers
//     const headersObj: { [key: string]: string } = {}

//     headers.forEach((value, key) => {
//       headersObj[key] = value
//     })

//     const cookieHeader = headers.get("cookie")
//     let authorization = null
//     if (cookieHeader) {
//       const cookies = Object.fromEntries(
//         cookieHeader.split("; ").map((cookie) => cookie.split("="))
//       )
//       authorization = cookies["authorization"]
//     }

//     console.log("All Headers:", headersObj)

//     const response = NextResponse.redirect(new URL("/401", request.url))

//     if (authorization) {
//       response.cookies.set({
//         name: "access_token",
//         value: JSON.stringify(headersObj),
//         path: "/",
//         httpOnly: true,
//         secure: true,
//         maxAge: 60 * 60 * 24,
//       })
//     }

//     return response
//   } catch (error) {
//     return NextResponse.redirect(new URL("/401", request.url))
//   }
// }

// export async function GET(request: Request) {
//   // const cookieStore = cookies()
//   // const token = cookieStore.get("token")

//   const cookie = `token=111222; Path=/; Secure; Max-Age=604800`

//   return new Response(JSON.stringify("Hello, Next.js!"), {
//     status: 200,
//     headers: { "Set-Cookie": cookie },
//   })
// }

// export async function POST(request: Request) {
//   try {
//     const PUBLIC_APP_URL = process.env.NEXT_PUBLIC_APP_URL ?? "/"
//     const headers = request.headers
//     const headersObj: { [key: string]: string } = {}

//     headers.forEach((value, key) => {
//       headersObj[key] = value
//     })

//     const cookieHeader = headers.get("cookie")
//     let authorization = null
//     if (cookieHeader) {
//       const cookies = Object.fromEntries(
//         cookieHeader.split("; ").map((cookie) => cookie.split("="))
//       )
//       authorization = cookies["authorization"]
//     }

//     console.log("All Headers:", headersObj)

//     const response = NextResponse.redirect(new URL(PUBLIC_APP_URL, request.url))

//     if (authorization) {
//       response.cookies.set({
//         name: "access_token",
//         value: JSON.stringify(headersObj),
//         path: "/",
//         httpOnly: true,
//         secure: true,
//         maxAge: 60 * 60 * 24,
//       })
//     }

//     return response
//   } catch (error) {
//     return NextResponse.redirect(new URL("/401", request.url))
//   }
// }

export async function POST(request: Request, response: Response) {
  try {
    const body = await request.text()
    const fromData = {}
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

    // const response = NextResponse.redirect(new URL("/", request.url))
    // response.cookies.set({
    //   name: "id_token",
    //   value: id_token.toString(),
    //   path: "/",
    //   httpOnly: false,
    //   secure: true,
    // })

    // response.headers.append(
    //   "Set-Cookie",
    //   `id_token=${id_token.toString()}; Path=/; HttpOnly=false; Secure=false`
    // )

    return response

    // const formData = await request.formData()
    // const idToken = formData.get("id_token")

    // console.log("idToken", idToken)

    // if (!idToken) {
    //   throw new Error("id_token is missing")
    // }

    const response = NextResponse.redirect(new URL("/", request.url))

    // response.cookies.set({
    //   name: "id_token",
    //   value: idToken.toString(),
    //   path: "/",
    //   httpOnly: false,
    //   secure: true,
    // })

    // return response

    // const response = new Response("Cookie set successfully", {
    //   status: 200,
    // })

    // response.headers.append(
    //   "Set-Cookie",
    //   `id_token=${idToken.toString()}; Path=/; HttpOnly=false; Secure=false`
    // )

    // return response
  } catch (error) {
    return NextResponse.redirect(new URL("/401", request.url))
  }

  //  body = {"id_token": "eyxxx&state=xxx"}
}
