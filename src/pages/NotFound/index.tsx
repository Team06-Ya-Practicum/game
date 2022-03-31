import React from 'react';
import cn from 'classnames';
import { Image } from 'components/Image';

import logo from 'img/logo.svg';
import css from './NotFound.module.css';

export const NotFound = () => (
    <main className={cn(css.main, css.container)}>
        <h1>Not Found</h1>
        <Image src={logo} alt="react logo" width={300} height={300} />
    </main>
);
