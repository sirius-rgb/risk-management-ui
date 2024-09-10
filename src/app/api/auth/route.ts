//  auth.js

import { handlers } from "@/auth"

export const { GET, POST } = handlers

// import { NextResponse } from "next/server"
// import { PrismaClient } from "@prisma/client"
// import bcrypt from "bcrypt"
// import jwt from "jsonwebtoken"

// const prisma = new PrismaClient()
// const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret_here"

// export async function POST(request: Request) {
//   const { username, password } = await request.json()

//   try {
//     const user = await prisma.user.findUnique({
//       where: { username },
//     })

//     if (!user) {
//       return NextResponse.json(
//         { success: false, message: "用户不存在" },
//         { status: 401 }
//       )
//     }

//     const isPasswordValid = await bcrypt.compare(password, user.password)

//     if (isPasswordValid) {
//       const token = jwt.sign({ userId: user.id }, JWT_SECRET, {
//         expiresIn: "1h",
//       })
//       const response = NextResponse.json(
//         { success: true, message: "登录成功" },
//         { status: 200 }
//       )
//       response.cookies.set("token", token, {
//         // httpOnly: true,
//         secure: process.env.NODE_ENV === "production",
//         sameSite: "strict",
//         maxAge: 3600, // 1小时
//         // path: "/",
//       })
//       return response
//     } else {
//       return NextResponse.json(
//         { success: false, message: "密码错误" },
//         { status: 401 }
//       )
//     }
//   } catch (error) {
//     console.error("登录错误:", error)
//     return NextResponse.json(
//       { success: false, message: "服务器错误" },
//       { status: 500 }
//     )
//   }
// }
