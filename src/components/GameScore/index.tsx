import React from 'react';
import { useSelector } from 'react-redux';
import { RootStateType } from 'store/store';
import styles from './GameScore.module.css';

const GameScore = () => {
    const score = useSelector((state: RootStateType) => state.game.score);

    return (
        <div className={styles.gameScore}>
            {`SCORE: ${score}`}
        </div>
    );
};

export default GameScore;
