import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export default function proxy(request: NextRequest) {
  // return NextResponse.next() // for now
  const token = request.cookies.get("token")?.value
  const isLoginPage = request.nextUrl.pathname === "/login"

  if (!token && !isLoginPage) {

    return NextResponse.redirect(new URL("/login", request.url))
  }

  if (token && isLoginPage) {
    return NextResponse.redirect(new URL("/", request.url))
  }

  return NextResponse.next()
}

export const config = {
//   matcher: ["/", "/dashboard/:path*", "/admin/:path*"],
    matcher: ["/"],
}