import React, { useEffect } from 'react';
import GameEngine from 'components/canvas/GameEngine';
import { useAppSelector } from 'store/hooks';
import cn from 'classnames';
import GamePopup from 'components/GamePopup';
import GameScore from 'components/GameScore';
import { EGameState } from 'store/slices/gameSlice';
import css from './Game.module.css';
import music from '../../assets/audio/music.wav';

const CANVAS_ID = 'game-scene';

export const Game = () => {
    const audioElement = document.querySelector('audio');
    useEffect(() => {
        const game = new GameEngine(`#${CANVAS_ID}`);
        const audioContext = new AudioContext();
        if (audioElement !== null) {
            const track = audioContext.createMediaElementSource(audioElement);
            track.connect(audioContext.destination);
        }
        return () => {
            game.destroy();
        };
    }, []);

    const gameState = useAppSelector(state => state.game.gameState);

    if (audioElement !== null) {
        if (gameState === EGameState.PLAYING) {
            audioElement.play();
        } else {
            audioElement.pause();
        }
    }

    return (
        <main id="game" className={cn(css.main, css.container)}>
            <GameScore />
            <GamePopup />
            <canvas id={CANVAS_ID} />
            <audio src={music} loop></audio>
        </main>
    );
};
