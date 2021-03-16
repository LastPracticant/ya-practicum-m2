import express, { Express } from 'express';
import cookieParser from 'cookie-parser';
import path from 'path';
import { renderBundle } from '../middlewares/renderBundle';
import { ExpressAuthAPI } from '../api/auth.api';
import { composeCookies, setCookies } from '../server.utils';

export function routing(app: Express) {
    const jsonParser = express.json();

    // TODO: отключил SW на время выполнения задач, LP-94
    // app.get('/sw.js', (_, res) => {
    //     res.sendFile(path.join(__dirname, '../sw.js'));
    // });

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
                console.log('her 1 ------', response);
                res.send(await response.json());
            })
            .catch((error) => {
                console.log('her 2 ------', error);
                res.status(error.status).send(error.statusText);
            });
    });

    app.post('/api/v2/auth/signin', jsonParser, (req, res) => {
        if (!req.body) return res.sendStatus(400);

        ExpressAuthAPI.signin(req.body)
            .then((response) => {
                setCookies(response, res);

                res.send(response);
            })
            .catch((error) => {
                res.status(error.status).send(error.statusText);
            });
    });

    app.post('/api/v2/auth/signup', jsonParser, (req, res) => {
        if (!req.body) return res.sendStatus(400);

        ExpressAuthAPI.signup(req.body)
            .then((response) => {
                setCookies(response, res);

                res.send(response);
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
                console.log('----------------------huy----------------------');
                res.clearCookie('uuid');
                res.clearCookie('authCookie');
                res.send(await response.text());
            })
            .catch((error) => {
                res.status(error.status).send(error.statusText);
            });
    });

    app.get('*', (req, res) => {
        res.renderBundle(req.url);
    });
}
