import db from "../DBConnecter";
import { execQuery } from "./utils";
import * as Logger from "./logger";

const TABLE_NAME = "users";

function initTable() {
  const sql = `
    CREATE TABLE users (
      uid VARCHAR(100),
      name VARCHAR(20)
    )
  `;
  execQuery(sql);
}

async function create(uid: string, name: string) {
  try {
    await execQuery(`INSERT INTO ${TABLE_NAME} SET ?`, { name, uid });
    Logger.log("INSERT", TABLE_NAME, { name, uid });
  } catch (e) {
    console.log("error:", e);
  }
}

const users = {
  initTable,
  create,
};

export default users;
