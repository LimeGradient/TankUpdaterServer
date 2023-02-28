const express = require('express');
const app = express();

let version = 'version = 1.0'

app.get('/', (req, res) => {
    res.send(version);
})

app.get('/download.zip', (req, res) => {
    res.sendFile('/xmath.c-master.zip', {root: __dirname})
})

app.listen(process.env.PORT || 8080, () => {
    console.log(`Server up at ${process.env.PORT}`);
})