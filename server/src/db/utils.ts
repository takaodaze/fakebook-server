import db from "../DBConnecter";

export const execQuery = (
  statement: string,
  params?: { [key: string]: string }
) => {
  return new Promise<any>((resolve, reject) => {
    db.query(statement, params, (err, results, fields) => {
      if (err) {
        reject(err);
      }
      resolve(results);
    });
  });
};
