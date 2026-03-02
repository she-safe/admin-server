import { cookies } from "next/headers";
require("dotenv").config()

const DbServerURL = process.env.DbServerURL||"http://bounding.246897.xyz";

export async function GET(req: Request) {
    const token = (await cookies()).get("token")?.value;

    // simple guard before hitting the remote service
    if (!token) {
      return new Response(JSON.stringify({ message: "Missing authentication token" }), {
        status: 401,
      });
    }

    try {
        const res = await fetch(`${DbServerURL}/admin/users`, {
            headers: {
                Authorization: `Bearer ${token}`
            },
            cache: "no-store"
        });

            const text = await res.text();
        // log raw response for debugging
        // console.log("/api GET users status", res.status, text);

        if (!res.ok) {
          // forward status and body (could be plain text)
          return new Response(text, { status: res.status });
        }

        // when ok, parse JSON
        return new Response(text, { status: res.status });
    } catch (err) {
        console.error("/api GET users error", err);
        return new Response(JSON.stringify({ message: "Server error" }), {
            status: 500,
        });
    }
}