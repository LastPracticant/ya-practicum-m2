import { Request, Response } from 'express';
import { Response as NodeFetchResponse } from 'node-fetch';

export function composeCookies(req: Request) {
    return Object.entries(req.cookies)
        .reduce<string>((acc, [key, value]) => `${acc}${key}=${value}; `, '');
}

export function setCookies(fetchResponse: NodeFetchResponse, expressResponse: Response) {
    const cookiesHeaders = fetchResponse.headers.raw()['set-cookie'];

    if (cookiesHeaders) {
        const cookies = cookiesHeaders.map((header) => {
            const cookieParams = header.split('; ');
            const cookieEntries = cookieParams[0].split('=');

            return cookieEntries;
        });

        cookies.forEach(([key, value]) => {
            expressResponse.cookie(key, value);
        });
    }
}
