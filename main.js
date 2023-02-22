const express = require('express');
const app = express();

let version = '{"version": "1.0"}'

app.get('/', (req, res) => {
    res.send(version);
})

app.listen(port, () => {
    console.log(`Server up at ${process.env.PORT}`);
})