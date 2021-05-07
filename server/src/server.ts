import connectDB, { connectProdDB } from "DBConnecter";
import express from "express";
import DB_API from "./db";

const startServer = async () => {
  const db = await connectProdDB();

  const port = 8000;
  const server = express();
  server.listen(port);
};
