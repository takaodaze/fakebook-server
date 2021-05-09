import { User } from "db/type";
import * as Users from "db/Users";
import { Connection } from "mysql";
import {
  connectTestDB,
  dropTableUtil,
  execQueryFactory,
  ExecQueryFunc,
} from "./utils";

const insertUser = async (db: Connection, testUser: User) => {
  await Users.create(db, testUser.uid, testUser.name, testUser.password);
};

let testDB: Connection;
let execQuery: ExecQueryFunc;

beforeAll(async () => {
  testDB = await connectTestDB();
  execQuery = execQueryFactory(testDB);
  await execQuery(Users.initTableSql);
});

test("success insert", async (done) => {
  const testUser = {
    uid: "gin2798@gmail.com",
    name: "gin",
    password: "password",
  };

  // test
  await insertUser(testDB, testUser);

  const queryResult = await execQuery(`SELECT * FROM ${Users.TABLE_NAME}`);

  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  const actualUser: User = { ...queryResult.results[0] } as User;
  expect(actualUser.uid).toBe(testUser.uid);
  expect(actualUser.password).toBe(testUser.password);
  expect(actualUser.name).toBe(testUser.name);
  done();
});

test("duplicate uid", async () => {
  if (testDB == null) {
    throw new Error("failure connection db");
  }

  const testUser = {
    uid: "takao1222@gmail.com",
    name: "takao",
    password: "password",
  };
  await expect(insertUser(testDB, testUser)).resolves.toEqual(undefined);
  // 同じuidの場合例外がおこる
  await expect(insertUser(testDB, testUser)).rejects.toThrowError();
});

afterAll(async () => {
  await dropTableUtil(execQuery, Users.TABLE_NAME);
  testDB.end();
});
