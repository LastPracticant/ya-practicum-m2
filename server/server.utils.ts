import { Request } from 'express';

export function composeCookies(req: Request) {
    return Object.entries(req.cookies)
        .reduce<string>((acc, [key, value]) => `${acc}${key}=${value}; `, '');
}
