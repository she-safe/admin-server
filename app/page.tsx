"use client"
import { useEffect, useState } from "react";
import Link from "next/link";
export default function Home() {
  return (
    <>
      <Users />
    </>
  );
}
type UserType = {
  userId: string;
  score: number;
};

export function Users() {
  const [users, setUsers] = useState<UserType[]>([]);
  useEffect(() => {
    async function fetchUsers() {
      const res = await fetch("/api");
      if (!res.ok) {
        const text = await res.text();
        console.error("Failed to load users", res.status, text);
        // you might redirect to login or show a message
        return;
      }
      const data = await res.json();
      setUsers(data);
    }
    fetchUsers();
  }, []);

  return (
    <div className="flex min-h-screen items-center justify-center bg-neutral-950 px-6">
      <div className="w-full max-w-5xl rounded-2xl bg-neutral-900 p-5 shadow-xl shadow-black/40">
        <div className="mb-8">
          <h1 className="text-2xl font-semibold text-white">Panicking Users</h1>
          <p className="mt-2 text-sm text-neutral-400">
            Sorted list of currently panicking users
          </p>
        </div>
        <div className="rounded-xl border border-neutral-800 bg-neutral-950 p-6 min-h-75">
          {users.map((u, idx) => {
            const key = u.userId ?? `user-${idx}`; // fallback when username missing
            return (
              <User
                key={key}
                userId={u.userId ?? "(unknown)"}
                score={u.score}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}

export function User(props: UserType) {
  return (
    <div className="flex text-center align-middle font-bold bg-neutral-900 rounded-2xl py-3 px-3 mb-2">
      <div className="bg-blue-900 w-min-30 py-2 px-3 mx-3 rounded-2xl hover:bg-blue-900 cursor-pointer transition duration-300 w-1/2">
        {props.userId}
      </div>
      <div className="bg-blue-900 w-min-30 py-2 px-3 mx-3 rounded-2xl hover:bg-blue-900 cursor-pointer transition duration-300 w-1/3">
        {props.score}
      </div>
      <Link href={`/data/${encodeURIComponent(props.userId)}`} className="w-1/6">
        <div className="bg-blue-600 w-min-30 py-2 px-3 mx-3 rounded-2xl hover:bg-blue-900 cursor-pointer transition duration-300">
          ≡
        </div>
      </Link>
    </div>
  );
}
