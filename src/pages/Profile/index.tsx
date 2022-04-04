import React from 'react';
import cn from 'classnames';
import { Image } from 'react-bootstrap';

import logo from 'img/logo.svg';
import css from './Profile.module.css';

export const Profile = () => (
    <main className={cn(css.main, css.container)}>
        <h1>Profile</h1>
        <Image src={logo} alt="react logo" width={300} height={300} />
    </main>
);
