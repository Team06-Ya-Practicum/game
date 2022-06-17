import React, { useEffect } from 'react';
import GameEngine from 'components/canvas/GameEngine';
import cn from 'classnames';
import GamePopup from 'components/GamePopup';
import GameScore from 'components/GameScore';
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
        <main id="game" className={cn(css.main, css.container)}>
            <GameScore />
            <GamePopup />
            <canvas id={CANVAS_ID} />
        </main>
    );
};
