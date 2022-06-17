import { Request, Response, NextFunction } from 'express';

export const getAll = (req: Request, res: Response, next: NextFunction) => {
    try {
        res.json('[]');
    } catch (err: unknown) {
        console.error('Error while getting forum messages', err);
        next(err);
    }
};

export const getOne = (req: Request, res: Response, next: NextFunction) => {
    try {
        res.json('{}');
    } catch (err: unknown) {
        console.error('Error while getting forum message', err);
        next(err);
    }
};

export const updateOne = (req: Request, res: Response, next: NextFunction) => {
    try {
        res.json('{}');
    } catch (err: unknown) {
        console.error('Error while updating forum message', err);
        next(err);
    }
};
