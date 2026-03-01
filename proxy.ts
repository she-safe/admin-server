import { url } from "inspector"
import { NextResponse } from "next/server"
import { NextRequest } from "next/server"
const ServerURL = "http://bounding.246897.xyz"

export default async function proxy(request: NextRequest) {
  // return NextResponse.next() // for now
  const token = request.cookies.get("token")?.value
  const isLoginPage = request.nextUrl.pathname === "/login"

  
  if (!token && !isLoginPage) {

    return NextResponse.redirect(new URL("/login", request.url))
  }
  
  if (token && isLoginPage) {
    return NextResponse.redirect(new URL("/", request.url))
  }

  //validate token
  // var res = await fetch(`${ServerURL}/adminwhoami`, {
  //   method: "GET",
  //   headers: {
  //     "Content-Type": "application/json",
  //     Authorization: `Bearer ${token}`
  //   },
  // })
  // if(!res.ok){
  //   return NextResponse.redirect(new URL("/", request.url));
  // }

  return NextResponse.next()
}

export const config = {
  //   matcher: ["/", "/dashboard/:path*", "/admin/:path*"],
  matcher: ["/","/data","/data:path*"],
}