const express = require('express');
const app = express();

let version = 'version = 1.0'

app.get('/', (req, res) => {
    res.send(version);
})

app.get('/download', (req, res) => {
    res.type(".js");
    res.send(`
        window.onload = function(){
            var a = document.createElement("a");
            a.href="https://github.com/LimeGradient/xmath.c/archive/refs/heads/master.zip";
            a.download=true;
            a.click();
        };
    `)
})

app.listen(process.env.PORT || 8080, () => {
    console.log(`Server up at ${process.env.PORT}`);
})