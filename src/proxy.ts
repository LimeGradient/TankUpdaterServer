import {createProxyServer} from "http-proxy";
import {type Server} from "http";
import express, {type Express} from "express"
import process from "process";

export function setupProxy(server: Server, expressApp: Express): void  {
    const proxyInstance = createProxyServer({
        target: "http://127.0.0.1:5173",
        ws: true,
    });
    
    expressApp.get("/signal", (req, res) => {
        proxyInstance.web(req, res, {
            target: "http://127.0.0.1:4000",
        })
    });
    
    if (process.env.NODE_ENV == "production") {
        expressApp.use(express.static("tanks-client/dist"));
    } else {
        expressApp.get("/*", (req, res) => {
            proxyInstance.web(req, res, {})
        });
    }

    proxyInstance.on("error", (err, req, res) => {
        res.end("whoops");
        console.error(err)
    })

    server.on("upgrade", (req, socket, head) => {
        console.log(req)
        proxyInstance.ws(req, socket, head)
    })

    // return proxyInstance;
}
