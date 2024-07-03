'use client';

import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  const router = useRouter(); // Use useRouter hook to get the router object

  return (
    <main className="flex min-h-screen  flex-col items-center justify-center sm:p-12 ">
      <div className="flex flex-col sm:flex-row justify-center items-center w-full max-w-screen-xl  shadow-lg rounded-lg overflow-hidden transition transform">
        <div className="w-full sm:w-1/2 flex justify-center p-5 lg:p-8">
          <Image
            src="/chessboard.png"
            alt="Chess Game"
            width={500}
            height={500}
            className="rounded-lg shadow-md"
          />
        </div>
        <div className="w-full sm:w-1/2 flex flex-col justify-center p-4 sm:p-6 lg:p-8">
          <h1 className="text-3xl sm:text-4xl font-bold font-mono  mb-4">Play Chess Against Stockfish Anytime</h1>
          <p className="text-gray-600 mb-8 font-mono dark:text-gray-400">Join our chess platform and improve your gameplay.</p>
          <form action={"/api/chess"} method="POST">
            <Button type="submit" className="p-5 text-3xl font-bold text-background bg-[#779952] hover:bg-slate-500">
              <Image src="/btn-icon.svg"  className="mr-3" width={30} height={30} alt="React Rooks Logo" />
              Start Game
            </Button>
          </form>
        </div>
      </div>
    </main>
  );
}