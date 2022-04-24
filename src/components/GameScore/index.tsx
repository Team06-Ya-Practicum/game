import React from 'react';
import { useSelector } from 'react-redux';
import { selectScore } from 'store/slices/gameSlice';
import styles from './GameScore.module.css';

const GameScore = () => {
    const score = useSelector(selectScore);

    return (
        <div className={styles.gameScore}>
            {`SCORE: ${score}`}
        </div>
    );
};

export default GameScore;
