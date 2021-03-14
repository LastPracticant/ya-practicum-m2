import express, { Express } from 'express';
import { renderBundle } from './middlewares/render-bundle';

const path = require('path');

const app: Express = express();
const PORT = process.env.PORT || 8000;

// TODO: отключил SW на время выполнения задач, LP-94
// app.get('/sw.js', (_, res) => {
//     res.sendFile(path.join(__dirname, '../sw.js'));
// });

app.get('*.(js|css|png|jpe?g|gif)$', (req, res) => {
    res.sendFile(path.join(__dirname, req.path));
});

app.use(renderBundle);
app.get('*', (req, res) => {
    res.renderBundle(req.url);
});

app.listen(PORT, () => {
    console.log(`Start in ${PORT}!`);
});
