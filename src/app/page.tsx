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
            src="/chess2.jpg"
            alt="Chess Game"
            width={500}
            height={500}
            className="rounded-lg shadow-md"
          />
        </div>
        <div className="w-full sm:w-1/2 flex flex-col justify-center p-4 sm:p-6 lg:p-8">
          <h1 className="text-3xl sm:text-4xl font-bold  mb-4">Play Chess</h1>
          <p className="text-gray-600 mb-8">Join our chess platform and improve your gameplay.</p>
          <form action={"/api/chess"} method="POST">
            <Button type="submit">
              new game
            </Button>
          </form>
          
        </div>
      </div>
    </main>
  );
}
