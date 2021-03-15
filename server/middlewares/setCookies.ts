import { NextFunction, Request, Response } from 'express';

export function setCookies(req: Request, res: Response, next: NextFunction) {
    const authCookie = req.cookies.authCookie2;

    if (authCookie === undefined) {
        let randomNumber = Math.random().toString();
        randomNumber = randomNumber.substring(2, randomNumber.length);
        res.cookie('authCookie2', randomNumber, { maxAge: 900000, httpOnly: true });
        console.log('cookie created successfully');
    } else {
        console.log('cookie exists', authCookie);
    }

    next();
}
