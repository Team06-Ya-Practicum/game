import React from 'react';
import cn from 'classnames';
import { Image } from 'components/Image';

import logo from 'img/logo.svg';
import css from './Game.module.css';

export const Game = () => (
    <main className={cn(css.main, css.container)}>
        <h1>Game</h1>
        <Image src={logo} alt="react logo" width={300} height={300} />
    </main>
);
