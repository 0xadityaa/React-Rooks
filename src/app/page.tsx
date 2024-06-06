'use client';

import React from "react";
import Image from "next/image";
import Button from "@/app/components/Button";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter(); // Use useRouter hook to get the router object

  return (
    <main className="flex min-h-screen  flex-col items-center justify-center sm:p-12 bg-teal-50">
      <div className="flex flex-col sm:flex-row justify-center items-center w-full max-w-screen-xl bg-blue-50 shadow-lg rounded-lg overflow-hidden transition transform hover:scale-105 hover:shadow-3xl duration-2">
        <div className="w-full sm:w-1/2 flex justify-center p-5 lg:p-8">
          <Image
            src="/chess2.jpg"
            alt="Chess Game"
            width={500}
            height={500}
            className="rounded-lg shadow-md"
          />
        </div>
        <div className="w-full sm:w-1/2 flex flex-col justify-center p-4 sm:p-6 lg:p-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Play Chess Online</h1>
          <p className="text-gray-600 mb-8">Join our online chess platform and challenge players from around the world.</p>
          <Button onClick={() => router.push("/login")}>
            Play Online
          </Button>
        </div>
      </div>
    </main>
  );
}
