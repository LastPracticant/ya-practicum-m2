import express from 'express';
import devMiddleware from 'webpack-dev-middleware';
import hotMiddleware from 'webpack-hot-middleware';
import cookieParser from 'cookie-parser';
import webpack, { Configuration } from 'webpack';
import { MongoClient } from 'mongodb';
import { Sequelize, SequelizeOptions } from 'sequelize-typescript';

import {
    MONGO_HOST,
    POSTGRES_CONNECT_OPTIONS,
} from '../env';
import webpackConfig from '../webpack.config.client';
import { renderBundle } from './middlewares/renderBundle';
import { routing } from './routing';
import { connectToUsers } from './models/users';

const compiler = webpack(webpackConfig as Configuration);
const mongo = new MongoClient(MONGO_HOST);
const sequelize = new Sequelize(POSTGRES_CONNECT_OPTIONS as SequelizeOptions);

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
        connectToUsers(sequelize);
        sequelize.sync({ force: true }).then(() => {
            console.info('--------------- Postgres connected. ---------------');
        })
            .catch(console.error);

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
