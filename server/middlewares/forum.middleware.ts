import { Request, Response, NextFunction } from 'express';
import { ICommentDTO } from '../models/comment';
import { ITopicDTO } from '../models/topic';

export const validateUserIdRequired = (req: Request, res: Response, next: NextFunction) => {
    const data: ICommentDTO | ITopicDTO = req.body;
    if (!data.UserId) {
        res.status(400).send('No userId provided');
        return;
    }
    if (res.locals.user && res.locals.user.id !== data.UserId) {
        res.status(401).send('Unauthorized');
        return;
    }
    next();
};
