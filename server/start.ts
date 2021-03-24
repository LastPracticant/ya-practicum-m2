import express, { Express } from 'express';
import cookieParser from 'cookie-parser';
import * as FormData from 'form-data';
import devMiddleware from 'webpack-dev-middleware';
import hotMiddleware from 'webpack-hot-middleware';
import webpack, { Configuration } from 'webpack';
import { renderBundle } from './middlewares/renderBundle';
import { routing } from './routing';
import webpackConfig from '../webpack.config.client';

import 'core-js/stable';
import 'regenerator-runtime/runtime';

const compiler = webpack(webpackConfig as Configuration);

// У nodejs нет FormData, необходимо для нормальной работы POST запросов а API Express
(global as any).FormData = FormData;

const app: Express = express();
const PORT = process.env.PORT || 5000;

app.use(cookieParser());
app.use(devMiddleware(compiler, {
    serverSideRender: true,
    writeToDisk: true,
    publicPath: webpackConfig.output.publicPath,
}));
app.use(hotMiddleware(compiler));
app.use(renderBundle);

routing(app);

app.listen(PORT, () => {
    console.log(`The server started on port: ${PORT}!`);
});
