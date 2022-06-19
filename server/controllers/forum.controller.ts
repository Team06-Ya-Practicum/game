import { Request, Response } from 'express';
import { Sequelize } from 'sequelize';
import Topic, { ITopicDTO } from '../models/topic';
import Comment, { ICommentDTO } from '../models/comment';
import sequelize from '../db';
import User from '../models/user';

export const getTopicsAll = async (req: Request, res: Response) => {
    try {
        const results = await Topic.findAll({
            attributes: {
                include: [
                    [Sequelize.fn('COUNT', Sequelize.col('Comments.id')), 'comment_num'],
                ],
            },
            include: [
                {
                    model: Comment,
                    attributes: [],
                },
            ],
            group: ['Topic.id'],
        });
        res.json(results);
    } catch (err: unknown) {
        const msg = 'Error while getting forum topics';
        console.error(msg, err);
        res.status(500).send(msg);
    }
};

export const getTopic = async (req: Request, res: Response) => {
    try {
        if (!req.params.id) {
            res.status(400).send('No id provided for detail topic request');
            return;
        }
        const results = await Topic.findOne({
            include: [
                {
                    model: Comment,
                    attributes: ['id', 'content', 'createdAt'],
                },
            ],
            where: {
                id: req.params.id,
            },
        });
        res.json(results);
    } catch (err: unknown) {
        const msg = 'Error while getting forum topic detail';
        console.error(msg, err);
        res.status(500).send(msg);
    }
};

export const createTopic = async (req: Request, res: Response) => {
    try {
        const data: ITopicDTO = req.body;
        const results = await sequelize.transaction(async t => {
            const currDate = new Date();
            let user = await User.findOne({
                where: {
                    id: data.UserId,
                },
            });
            if (!user) {
                user = await User.create({
                    id: data.UserId,
                    createdAt: currDate,
                    updatedAt: currDate,
                }, { transaction: t });
            }
            const newTopic = Topic.create({
                title: data.title,
                content: data.content,
                createdAt: currDate,
                updatedAt: currDate,
                UserId: user.id,
            }, { transaction: t });
            return newTopic;
        });
        res.json(results);
    } catch (err: unknown) {
        const msg = 'Error while creating forum topic';
        console.error(msg, err);
        res.status(500).send(msg);
    }
};

export const createComment = async (req: Request, res: Response) => {
    try {
        const data: ICommentDTO = req.body;
        if (!data.TopicId) {
            res.status(400).send('No topicId provided');
            return;
        }
        const results = await sequelize.transaction(async t => {
            const currDate = new Date();
            let user = await User.findOne({
                where: {
                    id: data.UserId,
                },
            });
            if (!user) {
                user = await User.create({
                    id: data.UserId,
                    createdAt: currDate,
                    updatedAt: currDate,
                }, { transaction: t });
            }
            const newComment = Comment.create({
                content: data.content,
                parent: data.parent || null,
                TopicId: data.TopicId,
                UserId: user.id,
                createdAt: currDate,
                updatedAt: currDate,
            }, { transaction: t });
            return newComment;
        });
        res.json(results);
    } catch (err: unknown) {
        const msg = 'Error while creating forum comment';
        console.error(msg, err);
        res.status(500).send(msg);
    }
};
