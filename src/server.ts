// import { connectProdDB } from "DBConnecter";
import express from "express";
import userRouter from "router/Users";

const startServer = (): void => {
  // const db = await connectProdDB();
  const port = 8000;
  const webServer = express();

  webServer.use("/user", userRouter);
  webServer.listen(port);
};

startServer();
