import {type Express} from "express";

export let version = "1.0"

export function setupRoutes(app: Express): void {
    app.get("/update/version", (req, res) => {
        res.send(`version = ${version}`);
    })

    app.get("/update/download", (req, res) => {
        res.sendFile("/xmath.c-master.zip", {root: __dirname})
    })
}