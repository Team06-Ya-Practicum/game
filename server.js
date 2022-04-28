const path = require('path');
const express = require('express');

const app = express();

app.use(express.static(path.join(__dirname, 'build')));
app.all('*', (req, res) => {
    res.sendFile('build/index.html', { root: __dirname });
});

const server = app.listen(process.env.PORT || 8080, () => {
    console.log('listening on port ', server.address().port);
});
