import React, { useEffect } from 'react';
import GameEngine from 'components/canvas/GameEngine';
import cn from 'classnames';
import css from './Game.module.css';

export const Game = () => {
    useEffect(() => {
        const game = new GameEngine();
        return () => {
            game.destroy();
        };
    });

    return (
        <main className={cn(css.main, css.container)}>
            <canvas id='game-scene' width='1600px' height='820px'/>
        </main>
    );
};
