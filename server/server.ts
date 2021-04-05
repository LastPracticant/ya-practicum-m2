import express from 'express';
import { Pool } from 'pg';
import devMiddleware from 'webpack-dev-middleware';
import hotMiddleware from 'webpack-hot-middleware';
import cookieParser from 'cookie-parser';
import webpack, { Configuration } from 'webpack';
import { MongoClient } from 'mongodb';

import {
    MONGO_HOST,
    POSTGRES_HOST,
} from '../env';
import webpackConfig from '../webpack.config.client';
import { renderBundle } from './middlewares/renderBundle';
import { routing } from './routing';

const compiler = webpack(webpackConfig as Configuration);

const postgres = new Pool({
    max: 20,
    connectionString: POSTGRES_HOST,
    idleTimeoutMillis: 30000,
});

const mongo = new MongoClient(MONGO_HOST);

export class Server {
    private app;

    constructor() {
        this.app = express();
        this.config();
        this.routerConfig();
        this.dbConnect();
    }

    private config() {
        this.app.use(cookieParser());
        this.app.use(devMiddleware(compiler, {
            serverSideRender: true,
            writeToDisk: true,
            publicPath: webpackConfig.output.publicPath,
        }));
        this.app.use(hotMiddleware(compiler));
        this.app.use(renderBundle);
    }

    private dbConnect() {
        postgres.connect((err) => {
            if (err) {
                console.error('--------------- Postgres connection error. ---------------');

                throw err;
            }

            console.info('--------------- Postgres connected. ---------------');
        });

        mongo.connect((err) => {
            if (err) {
                console.error('--------------- MongoDB connection error. ---------------');

                throw err;
            }

            console.info('--------------- MongoDB connected. ---------------');
        });
    }

    private routerConfig() {
        routing(this.app);
    }

    public start = (port: number) => new Promise((resolve, reject) => {
        this.app.listen(port, () => {
            resolve(port);
        }).on('error', (err: Object) => reject(err));
    });
}
