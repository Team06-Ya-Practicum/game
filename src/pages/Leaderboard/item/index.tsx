import React from 'react';
import { Card } from 'react-bootstrap';
import cx from 'classnames';
import styles from './styles.module.css';

export interface ILeaderboardItemProps {
    name: string
    score: number
};

const LeaderboardItem = ({ name, score }: ILeaderboardItemProps) => (
    <Card className={cx('d-flex', 'flex-row', 'justify-content-between', 'align-items-center', styles.item)}>
        <p className='text-white'>{name}</p>
        <p className='text-white'>{score || ''}</p>
    </Card>
);

export default LeaderboardItem;
