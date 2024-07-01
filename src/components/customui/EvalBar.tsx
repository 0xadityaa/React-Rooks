"use client";
import React from 'react';

const EvalBar = ({ score }: { score: number }) => {
    const maxScore = 1000; // Maximum score in centipawns
    const width = Math.min(Math.abs(score), maxScore) / maxScore * 100; // Convert score to percentage

    return (
        <>
        <div className="text-2xl font-bold">eval : {-1 * score} centipawns</div>
        <div className="rounded-md flex items-center justify-center h-[200px] w-[50px] bg-gray-200 text-center">
            <div style={{
                height: `${width}%`,
                width: `100%`,
                background: score > 0 ? "red" : "green",
                transition: 'width 0.3s ease'
            }} />
        </div>
        </>
       
    );
};

export default EvalBar;
