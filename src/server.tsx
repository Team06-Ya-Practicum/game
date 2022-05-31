import path from 'path';
import fs from 'fs';

import React from 'react';
import express, { Request, Response } from 'express';
import ReactDOMServer from 'react-dom/server';
import { StaticRouter } from 'react-router-dom/server';
import { Provider } from 'react-redux';
import { App } from 'app';
import { store } from './store/store';

const PORT = process.env.PORT || 5000;
const app = express();

app.get(
    /\.(js|css|map|ico|svg)$/,
    express.static(path.resolve(__dirname, '../build'))
);

app.get('*', (req: Request, res: Response) => {
    const appHTML = ReactDOMServer.renderToString(
        <Provider store={store}>
            <StaticRouter location={req.url}>
                <App />
            </StaticRouter>
        </Provider>
    );

    const indexFile = path.resolve(__dirname, '../public/index.html');
    fs.readFile(indexFile, 'utf-8', (err, data) => {
        if (err) {
            console.error('Read index.html file error:', err);
            return res.status(500).send('Read index.html file error!');
        }

        return res.send(
            data.replace(
                '<div id="root"></div>',
                `<div id="root">${appHTML}</div>`
            )
        );
    });
});

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});
