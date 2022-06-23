import { Request, Response, NextFunction } from 'express';

export const validateThemeUserId = (req: Request, res: Response, next: NextFunction) => {
    if (!req.params.id) {
        res.status(400).send('No user id provided for get theme request');
        return;
    }
    const id = Number(req.params.id);
    if (typeof id !== 'number') {
        res.status(400).send('Not valid user id provided for get theme request');
        return;
    }
    if (res.locals.user && res.locals.user.id !== id) {
        res.status(401).send('Unauthorized');
        return;
    }
    next();
};

export const validateThemeName = (req: Request, res: Response, next: NextFunction) => {
    const { theme } = req.body;
    if (!theme || ['light', 'dark'].indexOf(theme) < 0) {
        res.status(400).send('No theme name provided or wrong theme name');
        return;
    }
    next();
};
