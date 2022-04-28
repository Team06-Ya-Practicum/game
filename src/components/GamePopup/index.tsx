import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    EGameState,
    resetGameState,
    selectScore,
    selectState,
    setGameState,
} from 'store/slices/gameSlice';
import { Button, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router';
import { ROUTES } from 'index';
import styles from './GamePopup.module.css';

const GamePopup = () => {
    const gameState = useSelector(selectState);
    const score = useSelector(selectScore);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleStartGame = useCallback(() => {
        dispatch(setGameState(EGameState.PLAYING));
    }, [dispatch]);

    const handleNavToLeaderboards = useCallback(() => {
        dispatch(resetGameState());
        navigate(ROUTES.LEADERBOARD);
    }, [navigate, dispatch]);

    const handleRestartGame = useCallback(() => {
        dispatch(resetGameState());
    }, [dispatch]);

    if (gameState === EGameState.PLAYING) {
        return null;
    }
    return (
        <div className={styles.gamePopupWrapper}>
            <Card className={styles.gamePopupCard}>
                {gameState === EGameState.INIT
                    && <>
                        <p className={styles.helperText}>
                            Collect crystals, avoid cars
                        </p>
                        <p className={styles.helperText}>
                            Click &quot;PLAY&quot; to start the game
                        </p>
                        <Button
                            className={styles.btn}
                            onClick={handleStartGame}
                            variant='success'>
                            <span className={styles.btnText}>PLAY</span>
                        </Button>
                    </>
                }
                {gameState === EGameState.ENDED
                    && <>
                        <p className={styles.helperText}>
                            The game is over
                        </p>
                        <p className={styles.helperText}>
                            Your scored {score} points
                        </p>
                        <Button
                            className={styles.btn}
                            onClick={handleNavToLeaderboards}
                            variant='danger'>
                            <span className={styles.btnText}>LEADERBOARDS</span>
                        </Button>
                        <Button
                            className={styles.btn}
                            onClick={handleRestartGame}
                            variant='success'>
                            <span className={styles.btnText}>PLAY AGAIN</span>
                        </Button>
                    </>
                }
            </Card>
        </div>
    );
};

export default GamePopup;
