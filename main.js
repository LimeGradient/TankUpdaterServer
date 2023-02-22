const express = require('express');
const app = express();
const port = 8080

let version = '{"version": "1.0"}'

app.get('/', (req, res) => {
    res.send(version);
})

app.listen(port, () => {
    console.log(`Server up at ${port}`);
})