import mysql from "mysql";

export function connectDB(
  host: string,
  user: string,
  password: string | undefined
) {
  const dbConnect = mysql.createConnection({
    host,
    user,
    password,
  });

  dbConnect.connect(function (err) {
    if (err) {
      console.error("error connecting: " + err.stack);
      throw new Error("failure db connection");
    }

    console.log("connected mysql!!!");
  });

  return dbConnect;
}
