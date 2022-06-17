import { Request, Response } from 'express';

export const getAll = (req: Request, res: Response) => {
    try {
        res.json('[]');
    } catch (err: unknown) {
        const msg = 'Error while getting forum messages';
        console.error(msg, err);
        res.status(500).send(msg);
    }
};

export const getOne = (req: Request, res: Response) => {
    try {
        res.json('{}');
    } catch (err: unknown) {
        const msg = 'Error while getting forum message';
        console.error(msg, err);
        res.status(500).send(msg);
    }
};

export const updateOne = (req: Request, res: Response) => {
    try {
        res.json('{}');
    } catch (err: unknown) {
        const msg = 'Error while updating forum message';
        console.error(msg, err);
        res.status(500).send(msg);
    }
};
