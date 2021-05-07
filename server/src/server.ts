import express from "express";
import DB_API from "./db";

const port = 8000;

DB_API.Users.create("gin2798@gmail.com", "gin");

const server = express();
server.listen(port);
