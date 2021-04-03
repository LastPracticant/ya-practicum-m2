import express, { Express } from 'express';
import cookieParser from 'cookie-parser';
import * as FormData from 'form-data';
import devMiddleware from 'webpack-dev-middleware';
import hotMiddleware from 'webpack-hot-middleware';
import webpack, { Configuration } from 'webpack';
import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';
import { renderBundle } from './middlewares/renderBundle';
import { routing } from './routing';
import webpackConfig from '../webpack.config.client';
import { IS_DEV } from '../env';

import 'core-js/stable';
import 'regenerator-runtime/runtime';

dotenv.config();

const compiler = webpack(webpackConfig as Configuration);

// У nodejs нет FormData, необходимо для нормальной работы POST запросов а API Express
(global as any).FormData = FormData;

const MONGO_HOST = `mongodb://${IS_DEV ? 'localhost' : 'mongo'}:27017`;
const DB_NAME = 'docker-lesson';
const client = new MongoClient(MONGO_HOST);

console.log('------------------- process.env.MONGO_HOST - ', process.env.MONGO_HOST);
console.log('------------------- process.env.MONGO_PASSWORD - ', process.env.MONGO_PASSWORD);

const PORT = process.env.PORT || 5000;
const app: Express = express();

app.use(cookieParser());
app.use(devMiddleware(compiler, {
    serverSideRender: true,
    writeToDisk: true,
    publicPath: webpackConfig.output.publicPath,
}));
app.use(hotMiddleware(compiler));
app.use(renderBundle);

routing(app);

client.connect((err) => {
    if (err) {
        console.error('Can not connect to MongoDB.');
        throw err;
    }

    console.info('Connected successfully to server.');

    const db = client.db(DB_NAME);

    app.listen(PORT, () => {
        console.info(`The server started on port: ${PORT}!`);
        console.info('Database: ', db);
    });
});
