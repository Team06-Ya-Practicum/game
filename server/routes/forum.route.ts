import express from 'express';
import {
    getTopicsAll,
    getTopic,
    createTopic,
    createComment,
} from '../controllers/forum.controller';
import { validateUserIdRequired } from '../middlewares/forum.middleware';
import { checkIsAuthorized } from '../middlewares/common.middleware';

const forumRouter = express.Router();

forumRouter.get('/topics', [checkIsAuthorized], getTopicsAll);

forumRouter.get('/topics/:id', [checkIsAuthorized], getTopic);

forumRouter.post('/topics', [
    checkIsAuthorized,
    validateUserIdRequired,
], createTopic);

forumRouter.post('/comments', [
    checkIsAuthorized,
    validateUserIdRequired,
], createComment);

export default forumRouter;
