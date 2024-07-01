"use client";
import React, { useEffect, useState } from 'react';

async function fetchGames() {
    const url = '/api/chess/updateGame';

    try {
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error('HTTP error ' + response.status);
        }

        const data = await response.json();

        if (data.error) {
            console.log(data.error);
        } else {
            return data.games;
        }
    } catch (error) {
        console.log('Fetch Error: ', error);
    }
}

function ChessGames() {
    const [games, setGames] = useState([]);

    useEffect(() => {
        fetchGames().then(fetchedGames => {
            setGames(fetchedGames);
        });
    }, []);

    return (
        <div>
            <h2>Total Games Played: {games.length}</h2>
            {games.map((game, index) => (
                <div key={index} className="game-card">
                    <h3>Game {index + 1}</h3>
                    <h3>GameID {game._id}</h3>
                    <p>FEN: {game.fen}</p>
                    {/* Display other game details here */}
                </div>
            ))}
        </div>
    );
}

export default ChessGames;
