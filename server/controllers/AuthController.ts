import { Response, Request } from 'express';

import { ExpressOAuthAPI } from '../api/oauth.api';
import { ExpressAuthAPI } from '../api/auth.api';
import { getHeadersWithCookies, setCookies } from '../server.utils';

export class AuthController {
    public static checkAuth(req: Request, res: Response) {
        ExpressAuthAPI.getCurrentUserInfo({
            headers: getHeadersWithCookies(req),
        })
            .then(async (response) => {
                res.send(await response.json());
            })
            .catch((error) => {
                res.status(error.status).send(error.statusText);
            });
    }

    public static OAuthGetServiceId(req: Request, res: Response) {
        ExpressOAuthAPI.getServiceId()
            .then(async (response) => {
                res.send(await response.json());
            })
            .catch((error) => {
                res.status(error.status).send(error.statusText);
            });
    }

    public static OAuth(req: Request, res: Response) {
        if (!req.body) return res.sendStatus(400);

        ExpressOAuthAPI.signinWithYandex(req.body)
            .then(async (fetchResponse) => {
                setCookies(fetchResponse, res);

                res.send(await fetchResponse.text());
            })
            .catch((error) => {
                res.status(error.status).send(error.statusText);
            });
    }

    public static signin(req: Request, res: Response) {
        if (!req.body) return res.sendStatus(400);

        ExpressAuthAPI.signin(req.body)
            .then(async (fetchResponse) => {
                setCookies(fetchResponse, res);

                res.send(await fetchResponse.text());
            })
            .catch((error) => {
                res.status(error.status).send(error.statusText);
            });
    }

    public static signup(req: Request, res: Response) {
        if (!req.body) return res.sendStatus(400);

        ExpressAuthAPI.signup(req.body)
            .then(async (fetchResponse) => {
                setCookies(fetchResponse, res);

                res.send(await fetchResponse.text());
            })
            .catch((error) => {
                res.status(error.status).send(error.statusText);
            });
    }

    public static logout(req: Request, res: Response) {
        ExpressAuthAPI.logout({
            headers: getHeadersWithCookies(req),
        })
            .then(async (response) => {
                res.clearCookie('uuid');
                res.clearCookie('authCookie');
                res.send(await response.text());
            })
            .catch((error) => {
                res.status(error.status).send(error.statusText);
            });
    }
}
