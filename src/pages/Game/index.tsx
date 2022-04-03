import React, { useEffect } from 'react';
import GameEngine from 'components/canvas/GameEngine';
import './game.css';

export const Game = () => {
    useEffect(() => {
        const game = new GameEngine();
        return () => {
            game.destroy();
        };
    });

    return (
        <main className='game-wrapper'>
            <canvas id='game-scene' width='1600px' height='820px'/>
        </main>
    );
};
