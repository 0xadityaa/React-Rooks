
import mongoose, { model } from "mongoose";
import { InferSchemaType } from "mongoose";
import { Schema } from "mongoose";

const chessGameSchema = new Schema({
    fen: { 
        type: String,
        required: true
     },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true
    },
    status: {
      type: String,
      required: true
    },
    winner: {
      type: String,
      required: false
    },
    result_type: {
      type: String,
      required: false
    }
  }
);
  
const ChessGameModel = mongoose.models.chessgames || model<InferSchemaType<typeof chessGameSchema>>("chessgames", chessGameSchema)
export default ChessGameModel
  