import express from 'express';
import { getThemeForUser, setThemeForUser } from '../controllers/theme.controller';
import { validateThemeName, validateThemeUserId } from '../middlewares/theme.middleware';
import { checkIsAuthorized } from '../middlewares/common.middleware';

const themeRouter = express.Router();

themeRouter.get('/:id', [
    checkIsAuthorized,
    validateThemeUserId,
], getThemeForUser);

themeRouter.post('/:id', [
    checkIsAuthorized,
    validateThemeUserId,
    validateThemeName,
], setThemeForUser);

export default themeRouter;
