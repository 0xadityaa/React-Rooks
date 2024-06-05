import { Chess } from "chess.js"
import ChessBoardGame from "../components/ChessboardGame"


function page() {
  return (
    <div className="max-h-[50%] max-w-[50%] flex flex-col justify-center items-center">
      <ChessBoardGame />
    </div>
  )
}

export default page