import React, { useEffect } from 'react';
import GameEngine from 'components/canvas/GameEngine';
import cn from 'classnames';
import css from './Game.module.css';

const CANVAS_ID = 'game-scene';

export const Game = () => {
    useEffect(() => {
        const game = new GameEngine(`#${CANVAS_ID}`);
        return () => {
            game.destroy();
        };
    }, []);

    return (
        <main className={cn(css.main, css.container)}>
            <canvas id={CANVAS_ID}/>
        </main>
    );
};
