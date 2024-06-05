"use client";
import React, { useState } from "react";
import Chess from "chess.js";
import { Chessboard } from "react-chessboard";

export default function ChessBoardGame() {
  const [game, setGame] = useState(new Chess());
  const [gameHistory, setGameHistory] = useState([]);

  function makeAMove(move: any) {
    const gameCopy = { ...game };
    const result = gameCopy.move(move);
    setGame(gameCopy);
    setGameHistory([...gameHistory, move]);

    if (gameCopy.game_over()) {
      if (gameCopy.in_checkmate()) {
        alert("You won!");
      } else {
        alert("You lost!");
      }
    }

    return result;
  }

  function makeRandomMove() {
    const possibleMoves = game.moves();
    if (game.game_over() || game.in_draw() || possibleMoves.length === 0)
      return;
    const randomIndex = Math.floor(Math.random() * possibleMoves.length);
    makeAMove(possibleMoves[randomIndex]);
  }

  function onDrop(sourceSquare: any, targetSquare: any) {
    const move = makeAMove({
      from: sourceSquare,
      to: targetSquare,
      promotion: "q",
    });

    if (move === null) return false;

    setTimeout(makeRandomMove, 200);
    return true;
  }

  console.log("Game History:", gameHistory);

  return <Chessboard position={game.fen()} onPieceDrop={onDrop} />;
}