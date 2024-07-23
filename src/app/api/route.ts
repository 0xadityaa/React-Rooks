import { NextResponse } from "next/server";
import { connect } from "@/dbConfig/dbConfig";
import UserModel from "@/models/user"; 
import ChessGameModel from "@/models/chessGame";

export async function GET() {
  try {
    await connect(); // Ensure the database connection is established

    const usersCount = await UserModel.countDocuments();
    const gamesCount = await ChessGameModel.countDocuments();

    return NextResponse.json({ usersCount, gamesCount });
  } catch (error) {
    console.error("Error fetching stats:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
