import React, { useEffect } from 'react';
import { Button, Card } from 'react-bootstrap';
import { fetchLeaderboard } from 'controllers/leaderboard';
import { useDispatch, useSelector } from 'react-redux';
import { selectLeaderboardItems } from 'store/slices/leaderboardSlice';
import LeaderboardItem from 'pages/Leaderboard/item';
import { useNavigate } from 'react-router';
import { ROUTES } from 'routes';
import styles from './Leaderboard.module.css';

export const Leaderboard = () => {
    const items = useSelector(selectLeaderboardItems);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(fetchLeaderboard());
    }, [dispatch]);

    return (
        <main className='d-flex flex-column mt-auto mb-auto justify-content-center align-items-center'>
            <Card className="w-50">
                <Card.Header className='d-flex justify-content-center align-items-center text-white'>
                    L E A D E R B O A R D
                </Card.Header>
                <Card.Body className={styles.itemsContainer}>
                    {items.length === 0
                        && <LeaderboardItem
                            name='Empty leaderboard, be the first one'
                            score={0} />
                    }
                    {items.map(item => (
                        <LeaderboardItem
                            key={item.name}
                            name={item.name}
                            score={item.scoreTeam06Ya} />
                    ))}
                    <Button
                        className={styles.backToGameBtn}
                        variant='success'
                        onClick={() => navigate(ROUTES.GAME)}>
                        BACK TO GAME
                    </Button>
                </Card.Body>
            </Card>
        </main>
    );
};

export default Leaderboard;
