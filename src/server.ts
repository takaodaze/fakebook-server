// import { connectProdDB } from "DBConnecter";
import express from "express";

const startServer = (): void => {
  // const db = await connectProdDB();
  const port = 8000;
  const server = express();
  server.listen(port);
};

startServer();
