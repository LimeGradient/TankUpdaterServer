import {type Express} from "express";
import fileUpload from "express-fileupload";
import { promises as fsp, constants } from "fs";
import JSZip from "jszip";
import * as path from "path";

export let version = "1.0";

export function setupRoutes(app: Express): void {
    app.get("/update/version", (req, res) => {
        res.send(`version = ${version}`);
    })

    app.get("/update/download", (req, res) => {
        res.sendFile(path.resolve("./upload/completed.zip"))
    })

    app.post("/update/new-zip", async (req, res) => {
        const dir = "./upload";
        console.log("post")

        await fsp.rm(dir, {recursive: true, force: true}).catch((e) => {
            console.error(e)
        })

        await fsp.mkdir(dir);

        const newPath = path.resolve(dir + "/upload.zip");

        await new Promise((resolve, reject) => {

            let zip = req.files?.zip;

            if (zip == undefined) return;

            zip = <fileUpload.UploadedFile>zip;

            zip.mv(newPath, (err) => {
                if (err) {
                    console.log(err);
                    reject(err)
                }
    
                console.log("sucessfully uploaded zip");

                resolve(zip);
            })
        });

        const fileObject = await fsp.readFile(newPath);

        const zipObject = await JSZip.loadAsync(fileObject);

        zipObject.file("version.TANKS", version);

        const generatedZip = await zipObject.generateAsync({ type: "nodebuffer" });

        await fsp.writeFile(dir + "/completed.zip", generatedZip);
    })
}