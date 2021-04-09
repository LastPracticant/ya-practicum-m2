import { Response, Request, NextFunction } from 'express';
import { RESPONSES_MESSAGES } from '../controllers/controllers.consts';

export const checkAuth = (req: Request, res: Response, next: NextFunction) => {
    const cookies = req.headers.cookie;
    const isAuth = cookies?.includes('authCookie') && cookies?.includes('uuid');

    if (!isAuth) {
        res.status(400).send(RESPONSES_MESSAGES['403']);
    }

    next();
};
