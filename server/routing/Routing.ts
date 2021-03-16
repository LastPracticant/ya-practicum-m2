import express, { Express } from 'express';
import cookieParser from 'cookie-parser';
import path from 'path';
import { renderBundle } from '../middlewares/renderBundle';
import { AuthAPI } from '../api/auth.api';
import { composeCookies } from '../server.utils';

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
        AuthAPI.getCurrentUserInfo({
            headers: {
                Cookie: composeCookies(req),
            },
        })
            .then((response) => {
                res.send(response);
            })
            .catch((error) => {
                res.status(error.status).send(error.statusText);
            });
    });

    app.post('/api/v2/auth/signin', jsonParser, (req, res) => {
        if (!req.body) return res.sendStatus(400);

        AuthAPI.signin(req.body)
            .then((response) => {
                const cookiesHeaders = response.headers.raw()['set-cookie'];

                if (cookiesHeaders) {
                    const cookies = cookiesHeaders.map((header) => {
                        const cookieParams = header.split('; ');
                        const cookieEntries = cookieParams[0].split('=');

                        return cookieEntries;
                    });

                    cookies.forEach(([key, value]) => {
                        res.cookie(key, value);
                    });
                }

                res.send(response);
            })
            .catch((error) => {
                res.status(error.status).send(error.statusText);
            });
    });

    app.get('*', (req, res) => {
        res.renderBundle(req.url);
    });
}
