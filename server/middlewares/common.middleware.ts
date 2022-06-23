import { NextFunction, Request, Response } from 'express';
import axios from 'axios';

export const checkIsAuthorized = (req: Request, res: Response, next: NextFunction) => {
    const axiosInstance = axios.create({
        baseURL: 'https://ya-praktikum.tech/api/v2',
        withCredentials: true,
        headers: {
            cookie: req.get('cookie') || '',
        },
    });
    axiosInstance.get('/auth/user').then(data => {
        if (data.status !== 200) {
            throw new Error('not authorized');
        }
        res.locals.user = data.data; // eslint-disable-line no-param-reassign
        next();
    }).catch(err => {
        res.status(401).send(err.message);
    });
};
