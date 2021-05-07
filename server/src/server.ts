import { connectProdDB } from "DBConnecter";
import express from "express";
import { create } from "./db/Users";

const startServer = async () => {
  const db = await connectProdDB();
  const port = 8000;
  const server = express();
  server.listen(port);
};

startServer();
