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

export type ExecQueryFunc = (
  statement: string,
  params?: { [key: string]: string }
) => Promise<ExecResult>;

export const execQueryFactory = (db: Connection): ExecQueryFunc => {
  const execQuery: ExecQueryFunc = (statement, params) => {
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

  return execQuery;
};

export const dropTableUtil = async (
  execQuery: ExecQueryFunc,
  tableName: string
): Promise<ExecResult> => {
  return await execQuery(`DROP TABLE ${tableName}`);
};

export const DBConnectionError = (): Error => {
  return new Error("failure connection db");
};
