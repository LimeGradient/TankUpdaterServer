import express from "express";
import fileUpload from "express-fileupload";
import dotenv from "dotenv";
import {createServer} from "http";
import {setupRoutes} from "./update";
import {setupProxy} from "./proxy";

dotenv.config({ path: ".env.local" })

const app = express();
const server = createServer(app);

app.use(fileUpload());

setupRoutes(app);
setupProxy(server, app);

const port: number = Number.parseInt(process.env.PORT || "8080");

if (process.env.PORT == undefined) {
    console.warn("Port not defined in any .env files")
}

server.listen(port, () => {
    console.log(`Server up at ${port}`);
})

