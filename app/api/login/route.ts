import { NextResponse } from "next/server";
require("dotenv").config()

const DbServerURL = process.env.DbServerURL||"http://bounding.246897.xyz";

export async function POST(req: Request) {
  try {
    const { username, password } = await req.json();
    // log for debugging purposes – helps identify empty or malformed values
    console.log("/api/login received", { username, password });

    // basic validation on our side before touching the external service
    if (!username || typeof username !== "string" || username.trim() === "") {
      return new Response(JSON.stringify({ message: "username is required" }), {
        status: 400,
      });
    }

    const res = await fetch(`${DbServerURL}/adminlogin`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ adminName: username, password }),
    });

    const data = await res.json();

    if (!res.ok) {
      // mirror the exact status from the backend (400 for validation, 401 for auth, etc.)
      return new Response(JSON.stringify({ message: data.message }), {
        status: res.status,
      });
    }

    const token = data.token;

    const response = NextResponse.json({ success: true });
    if (token) {
      response.cookies.set("token", token, {
        httpOnly: true,
        secure: true,
        sameSite: "strict",
        path: "/",
      });
    }

    return response;
  } catch {
    return new Response(JSON.stringify({ message: "Server error" }), {
      status: 500,
    });
  }
}
