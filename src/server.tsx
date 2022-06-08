import path from 'path';
import fs from 'fs';

import React from 'react';
import express, { Request, Response } from 'express';
import ReactDOMServer from 'react-dom/server';
import { StaticRouter } from 'react-router-dom/server';
import { Provider } from 'react-redux';
import { reducers } from 'store/store';
import { createProxyMiddleware } from 'http-proxy-middleware';
import axios from 'axios';
import cookieParser from 'cookie-parser';
import { App } from 'app';
import { configureStore } from '@reduxjs/toolkit';
import { getUserInfo } from 'controllers/user';
import { fetchLeaderboard } from 'controllers/leaderboard';
import { PRIVATE_ROUTES, ROUTES } from 'routes';

const PORT = process.env.PORT || 5000;
const app = express();

app.use(cookieParser());

app.use(
    '/api',
    createProxyMiddleware({
        target: 'https://ya-praktikum.tech',
        changeOrigin: true,
        pathRewrite: {
            '^/api': '/api/v2',
        },
        cookieDomainRewrite: 'localhost',
    }),
);

app.use(express.static(path.resolve(__dirname, '../build')));

app.get('*', (req: Request, res: Response) => {
    const indexFile = path.resolve(__dirname, '../public/index.html');
    fs.readFile(indexFile, 'utf-8', async (err, data) => {
        if (err) {
            console.error('Read index.html file error:', err);
            return res.status(500).send('Read index.html file error!');
        }

        if (req.path === '/game') {
            const html = data.replace(
                '<script src="bundle.js"></script>',
                `<script>
                window.__NOT_HYDRATE__ = true 
            </script><script src="bundle.js"></script>
                 `,
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
            middleware: getDefaultMiddleware => getDefaultMiddleware({
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
                </Provider>,
            );

            const preloadedState = store.getState();

            const htmlWithStore = data
                .replace(
                    '<div id="root"></div>',
                    `<div id="root">${appHTML}</div>`,
                )
                .replace(
                    '<script src="bundle.js"></script>',
                    `<script>
                    window.__PRELOADED_STATE__ = ${JSON.stringify(
        preloadedState,
    )} 
                </script><script src="bundle.js"></script>
                 `,
                );

            return htmlWithStore;
        });

        return res.send(html);
    });
});

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});
