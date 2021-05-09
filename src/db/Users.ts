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

export async function createTable(db: Connection): Promise<ExecResult> {
  return await execQuery(db, initTableSql);
}

export async function create(
  db: Connection,
  uid: string,
  name: string,
  password: string
): Promise<ExecResult> {
  const result = await execQuery(db, `INSERT INTO ${TABLE_NAME} SET ?`, {
    name,
    uid,
    password,
  });
  Logger.log("INSERT", TABLE_NAME, { name, uid, password });
  return result;
}

const users = {
  createTable,
  create,
};

export default users;
