import express, { Express } from 'express';
import { renderHtml } from './render';

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

app.get('*', (req, res) => {
    const { html } = renderHtml(req.url);
    res.send(html);
});

app.listen(PORT, () => {
    console.log(`Start in ${PORT}!`);
});
