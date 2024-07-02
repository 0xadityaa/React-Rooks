/* eslint-disable */
"use client";
import React, { useState, useMemo, useEffect } from "react";
import Chess, { ChessInstance, ShortMove } from "chess.js";
import { Chessboard } from "react-chessboard";
import Engine from "@/lib/Engine";
import EvalBar from "./EvalBar";
import { Info } from "@/lib/Info";
import { Button } from "../ui/button";
import ChessDataComponent from "./ChessDataCard";

const levels: { [key: string]: number } = {
  "Easy 🤓": 2,
  "Medium 🧐": 8,
  "Hard 😵": 18,
};

const ChessGame = ({ gameId }: { gameId: string }) => {
  const engine = useMemo(() => new Engine(), []);
  const [game, setGame] = useState<ChessInstance | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [gamePosition, setGamePosition] = useState<string | null>(null);
  const [stockfishLevel, setStockfishLevel] = useState<number>(2);
  const [info, setInfo] = useState<Info | null>(null);
  const [gameResult, setGameResult] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function updateGameFen(fen: string) {
    const url = `/api/chess/updateGame?id=${gameId}`;

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ fen }),
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
          // @ts-ignore
          const chess = new Chess(
            data.game.fen
          );
          setGamePosition(chess.fen());
          setGame(chess);
        }
      })
      .catch((error) => {
        console.error(error);
        setError("An error occurred while fetching the game data.");
      });
  }, [gameId]);

  function findBestMove() {
    if (!game) return;

    engine.evaluatePosition(game.fen(), stockfishLevel);

    engine.onMessage(
      ({ bestMove, info }: { bestMove?: string; info?: Info }) => {
        if (bestMove) {
          game.move({
            from: bestMove.substring(0, 2),
            to: bestMove.substring(2, 4),
            promotion: bestMove.substring(4, 5) || "q",
          } as ShortMove);
          setGamePosition(game.fen());
          // Check for game over after AI move
          if (game.game_over()) {
            let result = "Game Over. ";
            if (game.in_checkmate()) {
              result += "Checkmate! ";
              result += game.turn() === "w" ? "Black wins." : "White wins.";
            } else if (game.in_stalemate()) {
              result += "Stalemate!";
            } else if (game.in_draw()) {
              result += "Draw!";
            } else if (game.in_threefold_repetition()) {
              result += "Threefold Repetition!";
            } else if (game.insufficient_material()) {
              result += "Insufficient Material!";
            }
            setGameResult(result);
          }
        }
        if (info) {
          setInfo(info);
        }
        setLoading(false);
      }
    );
  }

  function onDrop(sourceSquare: string, targetSquare: string, piece: string) {
    if (!game) return false;

    const move = game.move({
      from: sourceSquare,
      to: targetSquare,
      promotion: piece[1]?.toLowerCase() ?? "q",
    } as ShortMove);

    // illegal move
    if (move === null) return false;

    setGamePosition(game.fen());

    setTimeout(() => {
      updateGameFen(game.fen());
    }, 50000);

    // Find the best move for Stockfish
    setLoading(true);
    findBestMove();
    setLoading(false);

    return true;
  }

  useEffect(() => {
    if (gameResult) {
      alert(gameResult);
      setGameResult(null); // Reset gameResult after alert
    }
  }, [gameResult]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!game) {
    return <div>Loading...</div>;
  }

  const pieces = [
    "WP",
    "WN",
    "WB",
    "WR",
    "WQ",
    "WK",
    "BP",
    "BN",
    "BB",
    "BR",
    "BQ",
    "BK",
  ];

  const customPieces: {
    [key: string]: ({ squareWidth }: { squareWidth: number }) => JSX.Element;
  } = {};
  pieces.forEach((piece) => {
    customPieces[piece] = ({ squareWidth }) => (
      <div
        style={{
          width: squareWidth,
          height: squareWidth,
          backgroundImage: `url(/${piece}.png)`,
          backgroundSize: "100%",
        }}
      />
    );
  });

  return (
    <div className="flex flex-col md:flex-row gap-8">
      <div className="flex flex-col gap-4 mb-2 items-center md:w-3/5">
        <div className="flex justify-center gap-4 mb-2">
          {Object.entries(levels).map(([level, depth]) => (
            <Button key={level} onClick={() => setStockfishLevel(depth)}>
              {level}
            </Button>
          ))}
        </div>

        <div className="w-[500px]">
          <Chessboard
            id="StyledBoard"
            boardOrientation="white"
            position={game.fen()}
            onPieceDrop={onDrop}
            customBoardStyle={{
              borderRadius: "4px",
              boxShadow: "0 2px 10px rgba(0, 0, 0, 0.5)",
            }}
            customDarkSquareStyle={{ backgroundColor: "#779952" }}
            customLightSquareStyle={{ backgroundColor: "#edeed1" }}
            customPieces={customPieces}
          />
        </div>
        <div className="flex flex-row">
          <Button
            className="m-2"
            onClick={() => {
              game.reset();
              setGamePosition(game.fen());
            }}
          >
            Reset
          </Button>

          <Button
            className="m-2"
            onClick={() => {
              game.undo();
              setGamePosition(game.fen());
            }}
          >
            Undo
          </Button>
        </div>
      </div>
      <div className="md:w-2/5">
        <h2>Game Evaluation</h2>
        <EvalBar score={info?.score ?? 0} />
        <div className="overflow-auto">
          {!info && (
            <div className="bg-background border text-white p-2 mt-5 rounded-md">
              🟢 Stockfish ready
            </div>
          )}
          {loading && <div>Loading...</div>}
          {info && <ChessDataComponent data={info} />}
        </div>
      </div>
    </div>
  );
};

export default ChessGame;
