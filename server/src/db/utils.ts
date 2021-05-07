import { Connection, FieldInfo } from "mysql";

export type ExecResult = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  results: any;
  fields?: FieldInfo[];
};

export const execQuery = (
  db: Connection,
  statement: string,
  params?: { [key: string]: string }
): Promise<ExecResult> => {
  return new Promise<ExecResult>((resolve, reject) => {
    //
    db.query(statement, params, (err, results, fields) => {
      if (err) {
        reject(err);
      }
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      resolve({ results, fields });
    });
  });
};
