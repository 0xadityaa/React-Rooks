'use client '
import React from "react";
import ChessBoardGame from "../components/ChessboardGame";

function Page() {
  return (
    <div className="w-full h-screen flex flex-row justify-center items-center gap-5 bg-gray-100">
      <div className="w-3/4 md:w-1/2 lg:w-1/3 xl:w-1/4 bg-white rounded-lg shadow-lg">
        <ChessBoardGame/>
      </div>
    </div>
  );
}

export default Page;
