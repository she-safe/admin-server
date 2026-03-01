"use client"

import Link from "next/link";

interface BackButtonProps {
  route: string;
}

export default function BackButton({ route }: BackButtonProps) {
  return (
    <Link href={route}>
      <div className="m-7 w-12 h-12 bg-black rounded-full flex items-center justify-center hover:bg-neutral-700 cursor-pointer transition duration-300 shadow-lg border-2 border-transparent hover:shadow-[0_0_20px_rgba(217,119,6,0.6)] hover:border-yellow-600">
        <span className="text-white text-xl font-bold">←</span>
      </div>
    </Link>
  );
}
