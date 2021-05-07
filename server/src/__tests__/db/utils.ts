import { ExecResult } from "db/utils";
import { connectorFactory } from "DBConnecter";
import { Connection } from "mysql";

const HOST = "localhost";
const USER = "root";
const PASSWORD = "";
const TEST_DATABASE_NAME = "fakebook_test";

export const connectTestDB = connectorFactory(
  HOST,
  USER,
  TEST_DATABASE_NAME,
  PASSWORD
);

export const execQuery = (
  db: Connection,
  statement: string,
  params?: { [key: string]: string }
): Promise<ExecResult> => {
  return new Promise<ExecResult>((resolve, reject) => {
    db.query(statement, params, (err, results, fields) => {
      if (err) {
        reject(err);
      }
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      resolve({ results, fields });
    });
  });
};
