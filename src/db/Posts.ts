import { execQuery, ExecResult } from "./utils";
import * as Logger from "./logger";
import { Connection } from "mysql";

export const TABLE_NAME = "posts";
export const initTableSql = `
    CREATE TABLE ${TABLE_NAME} (
      post_id int NOT NULL PRIMARY KEY AUTO_INCREMENT,
      uid VARCHAR(100) NOT NULL,
      description VARCHAR(200) NOT NULL
    )
`;

export async function createTable(db: Connection): Promise<ExecResult> {
  return await execQuery(db, initTableSql);
}

export async function create(
  db: Connection,
  uid: string,
  description: string
): Promise<ExecResult> {
  const sql = `INSERT INTO ${TABLE_NAME} SET ?`;
  const data = { uid, description };
  const result = await execQuery(db, sql, data);
  Logger.log("INSERT", TABLE_NAME, data);
  return result;
}

const posts = {
  createTable,
  create,
};

export default posts;
