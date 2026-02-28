"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"

export default function LoginForm() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const router = useRouter()

  const handleLogin = async () => {
    // simple client-side validation prevents empty POST payloads
    if (!username.trim() || !password) {
      alert("Please enter both username and password.");
      return;
    }

    const res = await fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username: username.trim(), password }),
    })

    const data = await res.json()

    if (!res.ok) {
      alert(data.message)
      return
    }

    router.replace("/")
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-neutral-950 px-6">
      <div className="w-full max-w-md rounded-2xl bg-neutral-900 p-8 shadow-xl shadow-black/40">
        <div className="mb-8 text-center">
          <h1 className="text-2xl font-semibold text-white">
            Admin Sign in
          </h1>
          <p className="mt-2 text-sm text-neutral-400">
            Enter your credentials to continue
          </p>
        </div>

        <form
          className="space-y-5"
          onSubmit={(e) => {
            e.preventDefault();
            handleLogin();
          }}
        >
          <div>
            <label className="block text-sm text-neutral-300 mb-2">
              Username
            </label>
            <input
              type="text"
              placeholder="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full rounded-lg border border-neutral-800 bg-neutral-950 px-4 py-3 text-sm text-white outline-none transition focus:border-neutral-600"
            />
          </div>

          <div>
            <label className="block text-sm text-neutral-300 mb-2">
              Password
            </label>
            <input
              type="password"
              placeholder="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-lg border border-neutral-800 bg-neutral-950 px-4 py-3 text-sm text-white outline-none transition focus:border-neutral-600"
            />
          </div>

          <button
            type="submit"
            className="w-full rounded-lg bg-white py-3 text-sm font-medium text-black transition hover:opacity-90 active:scale-[0.99]"
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  )
}