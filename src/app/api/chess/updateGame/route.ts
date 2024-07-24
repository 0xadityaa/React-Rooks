import { connect } from '@/dbConfig/dbConfig';
import { NextRequest, NextResponse } from 'next/server';
import ChessGameModel from '@/models/chessGame';

connect()

interface ExtendedRequest extends NextRequest {
    id: string
}

export async function POST(req: ExtendedRequest) {
    const { searchParams } = new URL(req.url)
    const gameId = searchParams.get('id')

    const data = await req.json();
    const gameFen  = data['fen'];
    const status = data['status'];

    try {
        const chessGame = await ChessGameModel.findById(gameId).exec()
        if (chessGame) {
            // Update the game's FEN
            chessGame.fen = gameFen
            chessGame.status = status
            await chessGame.save()

            return NextResponse.json({
                game: chessGame,
                message: 'Game FEN updated successfully'
            })
        } else {
            return NextResponse.json({
                error: 'Game not found'
            })
        }
    } catch (error) {
        console.log(error)
        return NextResponse.json({
            error: 'An error occurred while updating the game FEN'
        })
    }
}

// get all games
export async function GET(req: ExtendedRequest) {
    try {

        const chessGames = await ChessGameModel.find().exec()
        if (chessGames) {
            return NextResponse.json(
                {
                    games: chessGames
                }
            )
        } else {
            return NextResponse.json({
                error: 'Game not found'
            })
        }

    } catch (error) {
        console.log(error)
        return NextResponse.json({
            error: 'Game not found'
        })
    }
}