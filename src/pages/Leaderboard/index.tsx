import React from 'react';
import { Card } from 'react-bootstrap';
import {ILeaderboardItem} from "controllers/leaderboard";

export const Leaderboard = () => {
    const items: ILeaderboardItem[] = [];

    return (
        <main className='d-flex flex-column mt-auto mb-auto justify-content-center align-items-center'>
            <Card className="w-50">
                <Card.Header className='d-flex justify-content-center align-items-center text-white'>
                    L E A D E R B O A R D
                </Card.Header>
                <Card.Body>
                    {items.map(item => <div key={item.name}>{item}</div>)}
                </Card.Body>
            </Card>
        </main>
    );
};
