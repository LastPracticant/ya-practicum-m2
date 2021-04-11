import express from 'express';
import devMiddleware from 'webpack-dev-middleware';
import hotMiddleware from 'webpack-hot-middleware';
import cookieParser from 'cookie-parser';
import webpack, { Configuration } from 'webpack';

import webpackConfig from '../webpack.config.client';
import { renderBundle } from './middlewares/renderBundle';
import { routing } from './routing';
import { postgres } from './models';
import { IS_DEV } from '../env';

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

        if (IS_DEV) {
            const compiler = webpack(webpackConfig as Configuration);

            this.app.use(devMiddleware(compiler, {
                serverSideRender: true,
                writeToDisk: true,
                publicPath: webpackConfig.output.publicPath,
            }));
            this.app.use(hotMiddleware(compiler));
        }

        this.app.use(renderBundle);
    }

    private dbConnect() {
        postgres.sync();
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
