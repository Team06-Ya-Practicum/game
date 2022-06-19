import { Request, Response } from 'express';
import User from '../models/user';

export const getThemeForUser = async (req: Request, res: Response) => {
    try {
        const id = Number(req.params.id);
        let user = await User.findOne({
            where: {
                id,
            },
        });
        const currDate = new Date(); // should've made all tables with timestamp: true
        if (!user) {
            user = await User.create({
                id,
                createdAt: currDate,
                updatedAt: currDate,
            });
        }
        res.json(user.theme);
    } catch (err) {
        const msg = 'Error while getting theme for user';
        console.error(msg, err);
        res.status(500).send(msg);
    }
};

export const setThemeForUser = async (req: Request, res: Response) => {
    try {
        const id = Number(req.params.id);
        const { theme } = req.body;
        await User.update({
            theme,
        }, {
            where: {
                id,
            },
        });
        res.status(200).send('Theme updated');
    } catch (err) {
        const msg = 'Error while setting theme for user';
        console.error(msg, err);
        res.status(500).send(msg);
    }
};
