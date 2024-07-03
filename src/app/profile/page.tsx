"use client";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Chessboard } from "react-chessboard";

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

function ChessGames() {
  const [games, setGames] = useState<any[]>([]);
  const router = useRouter();

  useEffect(() => {
    fetchGames().then((fetchedGames) => {
      setGames(fetchedGames);
    });
  }, []);

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">
        Total Games Played: {games.length}
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {games.map((game, index) => (
          <div
            key={index}
            className="bg-background border rounded-lg shadow-md p-4 cursor-pointer"
            onClick={() => router.push(`/Ai/${game._id}`)}
          >
            <h3 className="text-lg font-semibold mb-2">Game {index + 1}</h3>
            <p className="text-gray-600">
              <span className="font-semibold text-white">GameID: </span>
              {game._id}
            </p>
            <div className="mt-2 w-full aspect-square">
              <Chessboard
                position={game.fen}
                boardWidth={300}
                arePiecesDraggable={false}
                customBoardStyle={{
                  borderRadius: "4px",
                  boxShadow: "0 2px 10px rgba(0, 0, 0, 0.5)",
                }}
              />
            </div>
            {/* Display other game details here */}
          </div>
        ))}
      </div>
    </div>
  );
}

export default ChessGames;
