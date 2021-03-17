import express, { Express } from 'express';
import cookieParser from 'cookie-parser';
import path from 'path';
import { ExpressProfileAPI } from 'server/api/profile.api';
import { renderBundle } from '../middlewares/renderBundle';
import { ExpressAuthAPI } from '../api/auth.api';
import { composeCookies, setCookies } from '../server.utils';

export function routing(app: Express) {
    const jsonParser = express.json();

    app.get('*.(js|css|png|jpe?g|gif)$', (req, res) => {
        res.sendFile(path.join(__dirname, req.path));
    });

    app.use(cookieParser());
    app.use(renderBundle);

    app.get('/api/v2/auth/user', (req, res) => {
        ExpressAuthAPI.getCurrentUserInfo({
            headers: {
                Cookie: composeCookies(req),
            },
        })
            .then(async (response) => {
                res.send(await response.json());
            })
            .catch((error) => {
                res.status(error.status).send(error.statusText);
            });
    });

    app.post('/api/v2/auth/signin', jsonParser, (req, res) => {
        if (!req.body) return res.sendStatus(400);

        ExpressAuthAPI.signin(req.body)
            .then(async (response) => {
                setCookies(response, res);

                res.send(await response.text());
            })
            .catch((error) => {
                res.status(error.status).send(error.statusText);
            });
    });

    app.post('/api/v2/auth/signup', jsonParser, (req, res) => {
        if (!req.body) return res.sendStatus(400);

        ExpressAuthAPI.signup(req.body)
            .then(async (response) => {
                setCookies(response, res);

                res.send(await response.text());
            })
            .catch((error) => {
                res.status(error.status).send(error.statusText);
            });
    });

    app.post('/api/v2/auth/logout', jsonParser, (req, res) => {
        if (!req.body) return res.sendStatus(400);

        ExpressAuthAPI.logout({
            headers: {
                Cookie: composeCookies(req),
            },
        })
            .then(async (response) => {
                res.clearCookie('uuid');
                res.clearCookie('authCookie');
                res.send(await response.text());
            })
            .catch((error) => {
                res.status(error.status).send(error.statusText);
            });
    });

    app.put('/api/v2/user/profile', jsonParser, (req, res) => {
        if (!req.body) return res.sendStatus(400);

        ExpressProfileAPI.change(req.body, {
            headers: {
                Cookie: composeCookies(req),
            },
        })
            .then(async (response) => {
                setCookies(response, res);

                res.send(await response.json());
            })
            .catch((error) => {
                res.status(error.status).send(error.statusText);
            });
    });

    app.put('/api/v2/user/password', jsonParser, (req, res) => {
        if (!req.body) return res.sendStatus(400);

        ExpressProfileAPI.changePassword(req.body, {
            headers: {
                Cookie: composeCookies(req),
            },
        })
            .then(async (response) => {
                setCookies(response, res);

                res.send(await response.json());
            })
            .catch((error) => {
                res.status(error.status).send(error.statusText);
            });
    });

    app.get('*', (req, res) => {
        res.renderBundle(req.url);
    });
}
