import { NextFunction, Request, Response } from 'express';
import { renderHtml } from './render-html';

export default (req: Request, res: Response, next: NextFunction) => {
    res.renderBundle = (url: string) => {
        const { html } = renderHtml(url);

        res.send(html);
    };

    next();
};
