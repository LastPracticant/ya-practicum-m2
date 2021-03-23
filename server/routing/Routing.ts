import express, { Express } from 'express';
import cookieParser from 'cookie-parser';
import path from 'path';
import { ExpressProfileAPI } from 'server/api/profile.api';
import devMiddleware from 'webpack-dev-middleware';
import hotMiddleware from 'webpack-hot-middleware';
import webpack, { Configuration } from 'webpack';
import { renderBundle } from '../middlewares/renderBundle';
import { ExpressAuthAPI } from '../api/auth.api';
import { composeCookies, setCookies } from '../server.utils';
import webpackConfig from '../../webpack.config.client';

const compiler = webpack(webpackConfig as Configuration);

export function routing(app: Express) {
    const jsonParser = express.json();

    app.use(express.static(path.join(__dirname, './dist')));

    app.use(cookieParser());

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

    app.use(devMiddleware(compiler, {
        serverSideRender: true,
        writeToDisk: true,
        publicPath: webpackConfig.output.publicPath,
    }));
    app.use(hotMiddleware(compiler));
    app.use(renderBundle);

    app.get('*', (req, res) => {
        res.renderBundle(req.url);
    });
}
