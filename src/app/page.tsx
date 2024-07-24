"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import ShineBorder from "@/components/magicui/shine-border";

interface Stats {
  usersCount: number;
  gamesCount: number;
}

export default function Home() {
  const [stats, setStats] = useState<Stats | null>(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch("/api/");
        if (!response.ok) {
          throw new Error("Failed to fetch stats");
        }
        const data: Stats = await response.json();
        setStats(data);
      } catch (error) {
        console.error("Error fetching stats:", error);
      }
    };

    fetchStats();
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center sm:p-12 ">
      <ShineBorder
        className="flex flex-col border sm:flex-row justify-center items-center w-full max-w-screen-xl  shadow-lg rounded-lg overflow-hidden transition transform"
        color={["#A07CFE", "#FE8FB5", "#FFBE7B"]}
      >
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
          <div className="w-full sm:w-1/2 flex flex-col justify-start p-4 sm:p-6 lg:p-8">
            <h1 className="text-3xl sm:text-4xl font-bold mb-4 text-left">
              Join our chess platform and improve your chess.
            </h1>
            <p className="text-gray-600 mb-8   dark:text-gray-400">
              Play against <span className="font-bold">strongest</span> chess AI and get detailed analysis of your games
            </p>
            <div className="flex flex-row justify-start space-x-4 mb-8">
              {stats && (
                <>
                  <div className="text-center">
                    <p className="text-xl font-bold  ">
                      {stats.usersCount}{" "}
                      <span className="font-thin text-xl   text-gray-400">
                        Players Registered
                      </span>
                    </p>
                  </div>
                  <div className="text-center">
                    <p className="text-xl font-bold  ">
                      {stats.gamesCount}{" "}
                      <span className="font-thin text-xl   text-gray-400">
                        Games Played
                      </span>
                    </p>
                  </div>
                </>
              )}
            </div>
            <form action={"/api/chess"} method="POST">
              <Button
                type="submit"
                className="p-5 text-2xl font-mono font-bold text-background bg-[#779952] hover:bg-slate-500"
              >
                <Image
                  src="/btn-icon.svg"
                  className="mr-3"
                  width={30}
                  height={30}
                  alt="React Rooks Logo"
                />
                Play now
              </Button>
            </form>
          </div>
        </div>
      </ShineBorder>
    </main>
  );
}