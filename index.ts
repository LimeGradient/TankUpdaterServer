import express from "express";
import dotenv from "dotenv";

dotenv.config({ path: ".env.local" })

const app = express();

const version = "version = 1.0";

app.get("/version", (req, res) => {
    res.send(version);
})

app.get("/download.zip", (req, res) => {
    res.sendFile("/xmath.c-master.zip", {root: __dirname})
})

const port: number = Number.parseInt(process.env.PORT || "8080");

if (process.env.PORT == undefined) {
    console.warn("Port not defined in any .env files")
}

app.listen(port, () => {
    console.log(`Server up at ${port}`);
})

