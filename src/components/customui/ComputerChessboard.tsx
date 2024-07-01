"use client";
import React, { useState, useMemo, useEffect } from "react";
import Chess, { ChessInstance } from "chess.js";
import { Chessboard } from "react-chessboard";
import Engine from "@/lib/Engine";
import EvalBar from "./EvalBar";
import { Info } from "@/lib/Info";
import { Button } from "../ui/button";

const levels = {
  "Easy 🤓": 2,
  "Medium 🧐": 8,
  "Hard 😵": 18,
};

const ChessGame = ({ gameId }: { gameId: string }) => {
  const engine = useMemo(() => new Engine(), []);
  const [game, setGame] = useState<ChessInstance>();
  const [error, setError] = useState<string>();
  const [gamePosition, setGamePosition] = useState<string>();
  const [stockfishLevel, setStockfishLevel] = useState<number>(2);
  const [info, setInfo] = useState<Info>();

  async function updateGameFen(fen: string) {
    const url = `/api/chess/updateGame?id=${gameId}`;

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ fen: fen }),
      });

      if (!response.ok) {
        throw new Error("HTTP error " + response.status);
      }

      const data = await response.json();

      if (data.error) {
        console.log(data.error);
      } else {
        console.log(data.message);
        return data.game;
      }
    } catch (error) {
      console.log("Fetch Error: ", error);
    }
  }

  useEffect(() => {
    fetch(`/api/chess?id=${gameId}`)
      .then((response) => response.json())
      .then((data) => {
        console.log("data : ", data.game);
        if (data.error) {
          setError(data.error);
        } else {
          setGame(new Chess(data.game.fen));
          setGamePosition(data.game.fen);
        }
      })
      .catch((error) => {
        console.error(error);
        setError("An error occurred while fetching the game data.");
      });
  }, [gameId]);

  function findBestMove() {
    engine.evaluatePosition(game.fen(), stockfishLevel);

    engine.onMessage(
      ({ bestMove, info }: { bestMove?: string; info?: Info }) => {
        if (bestMove) {
          console.log(bestMove);
          game.move({
            from: bestMove.substring(0, 2),
            to: bestMove.substring(2, 4),
            promotion: bestMove.substring(4, 5) || "q", // Default to queen promotion
          });

          setGamePosition(game.fen());
        }
        if (info) {
          setInfo(info);
        }
      }
    );
  }

  function onDrop(sourceSquare: string, targetSquare: string, piece: string) {
    const move = game.move({
      from: sourceSquare,
      to: targetSquare,
      promotion: piece[1]?.toLowerCase() ?? "q",
    });

    // illegal move
    if (move === null) return false;

    setGamePosition(game.fen());

    setTimeout(() => {
      updateGameFen(game.fen());
    }, 50000);

    // exit if the game is over
    if (game.game_over() || game.in_draw()) return false;

    // Find the best move for Stockfish
    findBestMove();

    return true;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!game) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col items-center gap-8 bg-gray-100 p-8 rounded-lg shadow-lg">
      <h1 className="text-4xl font-bold text-blue-600">Game ID: {gameId}</h1>

      <div className="flex justify-center gap-4 mb-2">
        {Object.entries(levels).map(([level, depth]) => (
          <Button
            key={level}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={() => setStockfishLevel(depth)}
          >
            {level}
          </Button>
        ))}
      </div>

      <Chessboard
        id="PlayVsStockfish"
        position={gamePosition}
        onPieceDrop={onDrop}
        boardStyle={{
          borderRadius: "5px",
          boxShadow: `0 5px 15px rgba(0, 0, 0, 0.5)`,
        }}
      />

      <div className="flex justify-center gap-4 mt-4">
        <Button
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => {
            game.reset();
            setGamePosition(game.fen());
          }}
        >
          Reset
        </Button>

        <Button
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => {
            game.undo();
            setGamePosition(game.fen());
          }}
        >
          Undo
        </Button>
      </div>

      <div className="mt-8">
        <h2 className="text-2xl font-bold text-blue-600">Game Evaluation</h2>
        <EvalBar score={info?.score ?? 0} />
        <div className="mt-4">
          <pre className="p-4 bg-gray-800 text-white rounded">
            {info ? JSON.stringify(info, null, 2) : "🟢stockfish connected"}
          </pre>
        </div>
      </div>
    </div>
  );
};

export default ChessGame;
