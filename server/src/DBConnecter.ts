import mysql from "mysql";

const HOST = "localhost";
const USER = "root";
const PASSWORD = "";
const DATABASE_NAME = "fakebook";

export default function connectDB(
  host: string,
  user: string,
  databaseName: string,
  password?: string
) {
  const dbConnect = mysql.createConnection({
    host,
    user,
    password,
    database: databaseName,
  });

  const connect = () => {
    return new Promise<mysql.Connection>((resolve, reject) => {
      dbConnect.connect((err) => {
        if (err) {
          reject(err);
        }
        resolve(dbConnect);
      });
    });
  };

  return connect;
}

export const connectProdDB = connectDB(HOST, USER, DATABASE_NAME, PASSWORD);
