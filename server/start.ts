import express, { Express } from 'express';
import { renderBundle } from './render';

const path = require('path');

const app: Express = express();
const PORT = process.env.PORT || 8000;

// app.use(express.static(path.join(__dirname, './')));

// TODO: отключил SW на время выполнения задач
// app.get('/sw.js', (_, res) => {
//     res.sendFile(path.join(__dirname, '../sw.js'));
// });

app.get('*', (req, res) => {
    const patternForStatic = new RegExp('.(js|css|png|jpe?g|gif)$', 'g');
    if (patternForStatic.test(req.path)) {
        res.sendFile(path.join(__dirname, req.path));
    } else {
        const { html } = renderBundle();
        res.send(html);
    }
});

app.listen(PORT, () => {
    console.log(`Start in ${PORT}!`);
});
