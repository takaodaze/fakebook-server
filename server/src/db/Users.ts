import { execQuery, ExecResult } from "./utils";
import * as Logger from "./logger";
import { Connection } from "mysql";

export const TABLE_NAME = "users";

export const initTableSql = `
    CREATE TABLE users (
      uid VARCHAR(100) NOT NULL PRIMARY KEY,
      password VARCHAR(20) NOT NULL,
      name VARCHAR(20) NOT NULL
    )
`;

export async function initTable(db: Connection): Promise<ExecResult> {
  return await execQuery(db, initTableSql);
}

export async function create(
  db: Connection,
  uid: string,
  name: string,
  password: string
) {
  try {
    await execQuery(db, `INSERT INTO ${TABLE_NAME} SET ?`, {
      name,
      uid,
      password,
    });
    Logger.log("INSERT", TABLE_NAME, { name, uid, password });
  } catch (e) {
    throw e;
  }
}

const users = {
  initTable,
  create,
};

export default users;
