import express, { Express } from 'express';
import cookieParser from 'cookie-parser';
import { AuthAPIBase } from 'client/core/api';
import * as FormData from 'form-data';
import { renderBundle } from './middlewares/renderBundle';
import { setCookies } from './middlewares/setCookies';

const globals = global as any;

globals.FormData = FormData;

const jsonParser = express.json();

const path = require('path');

const app: Express = express();
const PORT = process.env.PORT || 8000;

const AuthAPIExpress = new AuthAPIBase();

// TODO: отключил SW на время выполнения задач, LP-94
// app.get('/sw.js', (_, res) => {
//     res.sendFile(path.join(__dirname, '../sw.js'));
// });

app.get('*.(js|css|png|jpe?g|gif)$', (req, res) => {
    res.sendFile(path.join(__dirname, req.path));
});

// app.use(cookieParser());
// app.use(setCookies);
app.use(renderBundle);

app.get('/api/v2/auth/user', (req, res) => {
    AuthAPIExpress.getCurrentUserInfo()
        .then((response) => {
            console.log('response --------------', response);
            res.send(response);
        })
        .catch((error) => {
            console.log('error --------------', error);
            res.status(error.status).send(error.statusText);
        });
});

app.post('/api/v2/auth/signin', jsonParser, (req, res) => {
    if (!req.body) return res.sendStatus(400);

    AuthAPIExpress.signin(req.body)
        .then((response) => {
            console.log('response --------------', response);
            res.send(response);
        })
        .catch((error) => {
            console.log('error --------------', error);
            res.status(error.status).send(error.statusText);
        });
});

app.get('*', (req, res) => {
    res.renderBundle(req.url);
});

app.listen(PORT, () => {
    console.log(`Start in ${PORT}!`);
});
