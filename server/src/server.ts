import { connectProdDB } from "src/DBConnecter";
import express from "express";

const startServer = async () => {
  const db = await connectProdDB();

  const port = 8000;
  const server = express();
  server.listen(port);
};

startServer();
