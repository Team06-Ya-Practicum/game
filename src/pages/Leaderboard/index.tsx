import React from 'react';
import cn from 'classnames';
import { Image } from 'react-bootstrap';

import logo from 'img/logo.svg';
import css from './Leaderboard.module.css';

export const Leaderboard = () => (
    <main className={cn(css.main, css.container)}>
        <h1>Leaderboard</h1>
        <Image src={logo} alt="react logo" width={300} height={300} />
    </main>
);
