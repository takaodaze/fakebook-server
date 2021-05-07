import { ExecResult } from "src/db/utils";
import connectDB from "src/DBConnecter";
import { Connection } from "mysql";

const HOST = "localhost";
const USER = "root";
const PASSWORD = "";
const TEST_DATABASE_NAME = "fakebook_test";

export const connectTestDB = connectDB(
  HOST,
  USER,
  TEST_DATABASE_NAME,
  PASSWORD
);

export const execQuery = (
  db: Connection,
  statement: string,
  params?: { [key: string]: string }
) => {
  return new Promise<ExecResult>((resolve, reject) => {
    db.query(statement, params, (err, results, fields) => {
      if (err) {
        reject(err);
      }
      resolve({ results, fields });
    });
  });
};
