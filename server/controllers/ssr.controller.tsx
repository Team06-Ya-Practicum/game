import { Request, Response } from 'express';
import path from 'path';
import fs from 'fs';
import axios from 'axios';
import { configureStore } from '@reduxjs/toolkit';
import ReactDOMServer from 'react-dom/server';
import { Provider } from 'react-redux';
import { StaticRouter } from 'react-router-dom/server';
import React from 'react';
import { reducers } from '../../src/store/store';
import { PRIVATE_ROUTES, ROUTES } from '../../src/routes';
import { getUserInfo } from '../../src/controllers/user';
import { fetchLeaderboard } from '../../src/controllers/leaderboard';
import { App } from '../../src/app';

export const resolveRequestSSR = (req: Request, res: Response) => {
    const indexFile = path.resolve(__dirname, '../public/index.html');
    fs.readFile(indexFile, 'utf-8', async (err, data) => {
        if (err) {
            console.error('Read index.html file error:', err);
            return res.status(500).send('Read index.html file error!');
        }

        if (req.path === '/game') {
            const html = data.replace(
                '<script src="/bundle.js"></script>',
                `<script>
                window.__NOT_HYDRATE__ = true 
            </script><script src="/bundle.js"></script>
                 `
            );

            return res.send(html);
        }

        const axiosInstance = axios.create({
            baseURL: 'https://ya-praktikum.tech/api/v2',
            withCredentials: true,
            headers: {
                cookie: req.get('cookie') || '',
            },
        });

        const store = configureStore({
            reducer: reducers,
            middleware: (getDefaultMiddleware) =>
                getDefaultMiddleware({
                    thunk: { extraArgument: axiosInstance },
                }),
        });

        const promises = [];

        if (PRIVATE_ROUTES.includes(req.path)) {
            promises.push(store.dispatch(getUserInfo()));
        }

        if (req.path === ROUTES.LEADERBOARD) {
            promises.push(store.dispatch(fetchLeaderboard()));
        }

        const html = await Promise.all(promises).then(() => {
            const appHTML = ReactDOMServer.renderToString(
                <Provider store={store}>
                    <StaticRouter location={req.url}>
                        <App />
                    </StaticRouter>
                </Provider>
            );

            const preloadedState = store.getState();

            const htmlWithStore = data
                .replace(
                    '<div id="root"></div>',
                    `<div id="root">${appHTML}</div>`
                )
                .replace(
                    '<script src="/bundle.js"></script>',
                    `<script>
                    window.__PRELOADED_STATE__ = ${JSON.stringify(
                        preloadedState
                    )} 
                </script><script src="/bundle.js"></script>
                 `
                );

            return htmlWithStore;
        });

        return res.send(html);
    });
};
