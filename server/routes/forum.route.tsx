import express from 'express';
import {
    getAll,
    getOne,
    updateOne,
} from '../controllers/forum.controller';

const forumRouter = express.Router();

forumRouter.get('/', getAll);

forumRouter.get('/:id', getOne);

forumRouter.put(':id', updateOne);

export default forumRouter;
