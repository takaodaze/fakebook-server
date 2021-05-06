import mysql from "mysql";

const host = "localhost";
const user = "root";
const password = "";
const databaseName = "fakebook";

export function connectDB(
  host: string,
  user: string,
  password: string | undefined,
  databaseName: string
) {
  const dbConnect = mysql.createConnection({
    host,
    user,
    password,
    database: databaseName,
  });

  dbConnect.connect(function (err) {
    if (err) {
      console.error("error connecting: " + err.stack);
      throw new Error("failure db connection");
    }
  });

  return dbConnect;
}

const db = connectDB(host, user, password, databaseName);

export default db;
