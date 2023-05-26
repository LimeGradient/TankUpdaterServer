import {createProxyServer} from "http-proxy";
import {type Server} from "http";
import express, {type Express} from "express"
import process from "process";
import { debug } from "console";

export function setupProxy(server: Server, expressApp: Express): void  {
    const proxyInstance = createProxyServer({
        target: "http://127.0.0.1:4000",
        ws: true,
    });

    expressApp.get("/", (req, res, next) => {
        next()
    })

    if (process.env.NODE_ENV == "production") {
        expressApp.use(express.static("tanks-client/dist"));
    } else {
        expressApp.get("/*", (req, res) => {
            proxyInstance.web(req, res, {
                target: "http://127.0.0.1:5173"
            })
        });
    }

    proxyInstance.on("error", (err, req, res) => {
        res.end("whoops");
        console.error(err)
    })

    server.on("upgrade", (req, socket, head) => {
        console.log(req.url)
        if (req.url?.includes("socket.io")) {
            proxyInstance.ws(req, socket, head)
        }
        proxyInstance.ws(req, socket, head, {target: "http://127.0.0.1:5173", ws: true})
    })

    // return proxyInstance;
}
