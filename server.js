const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 8000;

app.get('*', (req, res) => {
    const patternForStatic = new RegExp('.(js|css)$', 'g');
    if (patternForStatic.test(req.path)) {
        res.sendFile(path.join(__dirname, `/dist/${req.path}`));
    } else {
        res.sendFile(path.join(__dirname, '/dist/index.html'));
    }
});

app.listen(PORT, () => {
    console.log(`Start in ${PORT}!`);
});
