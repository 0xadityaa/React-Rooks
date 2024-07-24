"use client";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { ClockIcon } from "lucide-react";
import { JSX, SVGProps, useEffect, useState } from "react";
import NumberTicker from "./magicui/number-ticker";

async function fetchGames() {
  const url = "/api/chess/updateGame";

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error("HTTP error " + response.status);
    }

    const data = await response.json();

    if (data.error) {
      console.log(data.error);
    } else {
      return data.games;
    }
  } catch (error) {
    console.log("Fetch Error: ", error);
  }
}

export function PlayerStatsCards() {
  const [games, setGames] = useState<any[]>([]);

  useEffect(() => {
    fetchGames().then((fetchedGames) => {
      setGames(fetchedGames);
    });
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      <Card>
        <CardHeader className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <GamepadIcon className="h-8 w-8 text-primary" />
            <CardTitle>Total Games</CardTitle>
          </div>
          <div className="text-4xl font-bold">
            <NumberTicker value={games.length} />
          </div>
        </CardHeader>
      </Card>
      <Card>
        <CardHeader className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <TrophyIcon className="h-8 w-8 text-green-500" />
            <CardTitle>Wins</CardTitle>
          </div>
          <div className="text-4xl font-bold">
            <div>
              {games.filter(
                (game) =>
                  game.status === "Completed" &&
                  game.fen.split(" ")[1] &&
                  game.fen.split(" ")[1] === "b"
              ).length !== 0 ? (
                <NumberTicker
                  value={
                    games.filter(
                      (game) =>
                        game.status === "Completed" &&
                        game.fen.split(" ")[1] &&
                        game.fen.split(" ")[1] === "b"
                    ).length
                  }
                />
              ) : (
                0
              )}
            </div>
          </div>
        </CardHeader>
      </Card>
      <Card>
        <CardHeader className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <FlagIcon className="h-8 w-8 text-red-500" />
            <CardTitle>Losses</CardTitle>
          </div>
          <div className="text-4xl font-bold">
            <NumberTicker
              value={
                games.filter(
                  (game) =>
                    game.status === "Completed" &&
                    game.fen.split(" ")[1] === "w"
                ).length || 0
              }
            />
          </div>
        </CardHeader>
      </Card>
      <Card>
        <CardHeader className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <ClockIcon className="h-8 w-8 text-yellow-500" />
            <CardTitle>Pending Games</CardTitle>
          </div>
          <div className="text-4xl font-bold">
            <NumberTicker
              value={games.filter((game) => game.status === "pending").length}
            />
          </div>
        </CardHeader>
      </Card>
    </div>
  );
}

function FlagIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z" />
      <line x1="4" x2="4" y1="22" y2="15" />
    </svg>
  );
}

function GamepadIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="6" x2="10" y1="12" y2="12" />
      <line x1="8" x2="8" y1="10" y2="14" />
      <line x1="15" x2="15.01" y1="13" y2="13" />
      <line x1="18" x2="18.01" y1="11" y2="11" />
      <rect width="20" height="12" x="2" y="6" rx="2" />
    </svg>
  );
}

function TrophyIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
      <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
      <path d="M4 22h16" />
      <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" />
      <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" />
      <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" />
    </svg>
  );
}
