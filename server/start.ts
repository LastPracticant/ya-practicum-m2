import express, { Express } from 'express';
import cookieParser from 'cookie-parser';
import * as FormData from 'form-data';
import devMiddleware from 'webpack-dev-middleware';
import hotMiddleware from 'webpack-hot-middleware';
import webpack, { Configuration } from 'webpack';
import { MongoClient } from 'mongodb';
import { Pool } from 'pg';
import { IS_DEV } from '../env';
import { renderBundle } from './middlewares/renderBundle';
import { routing } from './routing';
import webpackConfig from '../webpack.config.client';
import 'core-js/stable';
import 'regenerator-runtime/runtime';

const pgPool = new Pool({
    max: 20,
    connectionString: 'postgres://user:password@hostname:port/dbname',
    idleTimeoutMillis: 30000,
});

const compiler = webpack(webpackConfig as Configuration);

// У nodejs нет FormData, необходимо для нормальной работы POST запросов а API Express
(global as any).FormData = FormData;

const MONGO_HOST = `mongodb://${IS_DEV ? 'localhost' : 'mongo'}:27017`;
const DB_NAME = 'docker-lesson';
const mongo = new MongoClient(MONGO_HOST);

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

mongo.connect((err) => {
    if (err) {
        console.error('--------------- Can not connect to MongoDB. ---------------');
        throw err;
    }

    console.info('--------------- Connected successfully to server. ---------------');

    const db = mongo.db(DB_NAME);

    app.listen(PORT, () => {
        console.info(`--------------- The server started on port: ${PORT}! ---------------`);
        console.info('---------------');
        console.info('Database: ', db);
        console.info('---------------');
    });
});
