import path from 'path';
import express from 'express';
import { createProxyMiddleware } from 'http-proxy-middleware';
import cookieParser from 'cookie-parser';
import { resolveRequestSSR } from './controllers/ssr.controller';
import forumRouter from './routes/forum.route';
import { initDB } from './db';
import themeRouter from './routes/theme.route';

const PORT = process.env.PORT || 5000;
const app = express();

initDB();

app.use(cookieParser());

app.use(
    '/api',
    createProxyMiddleware({
        target: 'https://ya-praktikum.tech',
        changeOrigin: true,
        pathRewrite: {
            '^/api': '/api/v2',
        },
        cookieDomainRewrite: 'https://team06-crystal-12.ya-praktikum.tech',
    }),
);

app.use(express.static(path.resolve(__dirname, '../build')));

app.use(express.json());

app.use('/forum', forumRouter);

app.use('/theme', themeRouter);

app.get('*', resolveRequestSSR);

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});
