import express from "express";
import db from "./DB/DBConnecter";

const port = 8000;

const server = express();
server.listen(port);
