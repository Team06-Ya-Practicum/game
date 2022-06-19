import express from 'express';
import { getTopicsAll, getTopic, createTopic } from '../controllers/forum.controller';

const forumRouter = express.Router();

forumRouter.get('/topics', getTopicsAll);

forumRouter.get('/topics/:id', getTopic);

forumRouter.post('/topics', createTopic);

export default forumRouter;
