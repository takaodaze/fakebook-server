import express from "express";
import DB_API from "./db";

const port = 8000;
try {
  DB_API.Users.create("gin2798@gmail.com", "gin");
} catch (e) {
  console.log("aa", e);
}

const server = express();
server.listen(port);
