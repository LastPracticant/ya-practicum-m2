import express, { Express } from 'express';

import * as FormData from 'form-data';
import { routing } from './routing';

import 'core-js/stable';
import 'regenerator-runtime/runtime';

const globals = global as any;

globals.FormData = FormData;

const app: Express = express();
const PORT = process.env.PORT || 8000;

routing(app);

app.listen(PORT, () => {
    console.log(`Start in ${PORT}!`);
});
