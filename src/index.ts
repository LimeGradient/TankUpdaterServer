import express from "express";
import dotenv from "dotenv";
import {setupRoutes} from "./update";

dotenv.config({ path: ".env.local" })

const app = express();

setupRoutes(app);

const port: number = Number.parseInt(process.env.PORT || "8080");

if (process.env.PORT == undefined) {
    console.warn("Port not defined in any .env files")
}

app.listen(port, () => {
    console.log(`Server up at ${port}`);
})

