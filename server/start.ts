import express, { Express } from 'express';
import cookieParser from 'cookie-parser';
import * as FormData from 'form-data';
import { renderBundle } from './middlewares/renderBundle';
import { routing } from './Routing';

(global as any).FormData = FormData;

const app: Express = express();
const PORT = process.env.PORT || 8000;

app.use(cookieParser());
app.use(renderBundle);

routing(app);

app.listen(PORT, () => {
    console.log(`Start in ${PORT}!`);
});
