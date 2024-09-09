import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { jwtVerify } from "jose"

const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret_here"

// 定义不需要保护的路由
const publicRoutes = ["/", "/api/auth"]

export async function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value
  const path = request.nextUrl.pathname

  // 如果是公开路由，直接放行
  if (publicRoutes.includes(path)) {
    return NextResponse.next()
  }

  // 对于其他所有路由，进行token验证
  if (!token) {
    return NextResponse.redirect(new URL("/", request.url))
  }

  try {
    await jwtVerify(token, new TextEncoder().encode(JWT_SECRET))
    return NextResponse.next()
  } catch (error) {
    console.log("Token验证错误", error)
    // 清除无效的token
    const response = NextResponse.redirect(new URL("/", request.url))
    response.cookies.delete("token")
    return response
  }
}

// 更新 matcher 以包含所有路由，但排除静态文件和API路由
export const config = {
  matcher: ["/((?!_next/static|favicon.ico|api/).*)"],
}
