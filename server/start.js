const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 8000;

app.use(express.static(path.join(__dirname, '../dist')));

app.get('/sw.js', (_, res) => {
    res.sendFile(path.join(__dirname, '../sw.js'));
});

app.get('*', (_, res) => {
    res.sendFile(path.join(__dirname, '../dist/index.html'));
});

app.listen(PORT, () => {
    console.log(`Start in ${PORT}!`);
});
