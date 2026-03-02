import { cookies } from "next/headers";
require("dotenv").config()

const DbServerURL = process.env.DbServerUrl||"http://bounding.246897.xyz";

export async function POST(req: Request) {
    // parse incoming JSON and extract userId property
    const body = await req.json();
    const userId = body?.userId;

    if (!userId) {
      // if client didn't send userId, respond with bad request
      return new Response(JSON.stringify({ message: "Missing userId in request body" }), {
        status: 400,
      });
    }

    const token = (await cookies()).get("token")?.value;
    if (!token) {
      return new Response(JSON.stringify({ message: "Missing authentication token" }), {
        status: 401,
      });
    }
    try {
        const res = await fetch(`${DbServerURL}/admin/data`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({ userId })
        });

        const data = await res.json();

        if (!res.ok) {
          // forward status and body (could be plain text)
          return new Response(JSON.stringify({ message: data.message }), { status: res.status });
        }

        // when ok, forward the JSON payload
        return new Response(JSON.stringify(data), { status: res.status });
    } catch (err) {
        console.error("/api/data POST error", err);
        return new Response(JSON.stringify({ message: "Server error" }), {
            status: 500,
        });
    }
}