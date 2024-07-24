"use client" ;
import ComputerChessboard from "@/components/customui/ComputerChessboard";
import { useState } from "react";

function GameInstance({ params }: { params: { gameId: string } }) {
  const [gameId, setGameId] = useState<string>(params.gameId);
  console.log(gameId)

  return (
    <div className="flex justify-start items-center h-[30%]">
      <ComputerChessboard gameId={gameId} />
    </div>
  );
}
export default GameInstance;