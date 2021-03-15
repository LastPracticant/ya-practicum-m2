import { NextFunction, Request, Response } from 'express';
import { renderHtml } from './renderHtml';

export function renderBundle(req: Request, res: Response, next: NextFunction) {
    res.renderBundle = (url: string) => {
        const { html } = renderHtml(url);

        res.send(html);
    };

    next();
}
