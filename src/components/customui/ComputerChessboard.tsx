"use client";
import React, { useState, useMemo, useEffect } from 'react';
import * as ChessLib from 'chess.js';
import { Chessboard } from 'react-chessboard';
import Engine from '@/lib/Engine';
import EvalBar from './EvalBar';
import { Info } from '@/lib/Info';
import { Button } from '../ui/button';

const levels = {
  "Easy 🤓": 2,
  "Medium 🧐": 8,
  "Hard 😵": 18,
};

const ChessGame = ({ gameId }: { gameId: string }) => {
  const engine = useMemo(() => new Engine(), []);
  const [game, setGame] = useState<ChessLib.ChessInstance>();
  const [error, setError] = useState<string>();
  const [gamePosition, setGamePosition] = useState<string>();
  const [stockfishLevel, setStockfishLevel] = useState<number>(2);
  const [info, setInfo] = useState<Info>();

  async function updateGameFen(fen: string) {
    const url = `/api/chess/updateGame?id=${gameId}`

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ fen: fen }),
        });

        if (!response.ok) {
            throw new Error('HTTP error ' + response.status);
        }

        const data = await response.json();

        if (data.error) {
            console.log(data.error);
        } else {
            console.log(data.message);
            return data.game;
        }
    } catch (error) {
        console.log('Fetch Error: ', error);
    }
}

  useEffect(() => {
    fetch(`/api/chess?id=${gameId}`)
      .then(response => response.json())
      .then(data => {
        console.log("data : ", data.game)
        if (data.error) {
          setError(data.error);
        } else {
          setGame(new ChessLib.Chess(data.game.fen));
          setGamePosition(data.game.fen);
        }
      })
      .catch(error => {
        console.error(error);
        setError('An error occurred while fetching the game data.');
      });
  }, [gameId]);

  function findBestMove() {
    engine.evaluatePosition((game?.fen()!), stockfishLevel);

    engine.onMessage(({ bestMove, info }: { bestMove?: string, info?: Info }) => {
      if (bestMove) {
        console.log(bestMove);
        game?.move({
          from: bestMove.substring(0, 2),
          to: bestMove.substring(2, 4),
          promotion: bestMove.substring(4, 5) || 'q', // Default to queen promotion
        });

        setGamePosition(game.fen());
      }
      if (info) {
        setInfo(info);
      }
    });
  }

  function onDrop(sourceSquare: string, targetSquare: string, piece: string) {
    const move = game.move({
      from: sourceSquare,
      to: targetSquare,
      promotion: piece[1]?.toLowerCase() ?? 'q',
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
    <div className='flex gap-8'>


      <div className='flex gap-4 mb-2 flex-col items-center'>
        <h1>game : {gameId}</h1>
        <div
          className='flex justify-center gap-4 mb-2'
        >
          {Object.entries(levels).map(([level, depth]) => (
            <Button
              key={level}
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
        />

        <Button
          className='m-2'
          onClick={() => {
            game.reset();
            setGamePosition(game.fen());
          }}
        >
          Reset
        </Button>

        <Button
          className='m-2'
          onClick={() => {
            game.undo();
            setGamePosition(game.fen());
          }}
        >
          Undo
        </Button>
      </div>
      <div>
        Game Evaluation
        <EvalBar score={info?.score ?? 0} />
        <div>
          <pre>
            {info ? JSON.stringify(info, null, 2) : '🟢stockfish connected'}
          </pre>
        </div>
      </div>
    </div>
  );
}

export default ChessGame;
