import {type Express} from "express";
import fileUpload from "express-fileupload";
import { promises as fsp, constants } from "fs";
import * as path from "path";

export let version = "1.0"

export function setupRoutes(app: Express): void {
    app.get("/update/version", (req, res) => {
        res.send(`version = ${version}`);
    })

    app.get("/update/download", (req, res) => {
        res.sendFile("/xmath.c-master.zip", {root: __dirname})
    })

    app.post("/update/new-zip", async (req, res) => {
        const dir = "./upload";
        console.log("post")

        await fsp.rm(dir, {recursive: true, force: true}).catch((e) => {
            console.error(e)
        })

        await fsp.mkdir(dir);

        let zip = req.files?.zip;

        if (zip == undefined) return;

        zip = <fileUpload.UploadedFile>zip;

        const newPath = path.resolve(dir + "/upload.zip");

        console.log(newPath)

        zip.mv(newPath, (err) => {
            if (err) {
                console.log(err);
                return;
            }

            console.log("sucessfully uploaded zip");
        })
    })
}