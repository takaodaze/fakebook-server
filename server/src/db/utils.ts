import { Connection, FieldInfo } from "mysql";

export type ExecResult = {
  results: any;
  fields?: FieldInfo[];
};

export const execQuery = (
  db: Connection,
  statement: string,
  params?: { [key: string]: string }
) => {
  return new Promise<ExecResult>((resolve, reject) => {
    //
    db.query(statement, params, (err, results, fields) => {
      if (err) {
        reject(err);
      }
      resolve({ results, fields });
    });
  });
};
