const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 8000;
const patternForStatic = new RegExp('.(js|css)$', 'g');

app.get(patternForStatic, (req, res) => {
    res.sendFile(path.join(__dirname, `../dist/${req.path}`));
});

app.get('*', (_, res) => {
    res.sendFile(path.join(__dirname, '../dist/index.html'));
});

app.listen(PORT, () => {
    console.log(`Start in ${PORT}!`);
});
