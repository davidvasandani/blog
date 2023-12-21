import express, { Router, Request, Response } from "express";
import serverless from "serverless-http";
import os from "os";

const api = express();

const router = Router();
router.get("/hello", (req, res) => res.send("Hello World!"));

// Echo route
router.get("/echo", (req: Request, res: Response) => {
  const echo = {
    path: req.path,
    headers: req.headers,
    method: req.method,
    body: req.body,
    cookies: req.cookies,
    hostname: req.hostname,
    ip: req.ip,
    protocol: req.protocol,
    query: req.query,
    subdomains: req.subdomains,
    os: {
      hostname: os.hostname()
    },
  };

  res.json(echo);
});

api.use("/api/", router);

export const handler = serverless(api);