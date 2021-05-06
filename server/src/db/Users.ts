import db from "../DBConnecter";
import { afterExec } from "./utils";
import * as Logger from "./logger";

const TABLE_NAME = "users";

function initTable() {
  const sql = `
    CREATE TABLE users (
      uid VARCHAR(100),
      name VARCHAR(20)
    )
  `;
  db.query(sql, afterExec);
}

function create(name: string, uid: string) {
  db.query(`INSERT INTO ${TABLE_NAME} SET ?`, { name, uid }, afterExec);
  Logger.insertLog(TABLE_NAME, { name, uid });
}

const users = {
  initTable,
  create,
};

export default users;
