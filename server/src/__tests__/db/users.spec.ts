import { User } from "db/type";
import * as Users from "db/Users";
import { Connection } from "mysql";
import { connectTestDB, execQuery } from "./utils";

const insertUser = async (db: Connection, testUser: User) => {
  await Users.create(db, testUser.uid, testUser.name, testUser.password);
};

let testDB: Connection | null;

beforeAll(async (done) => {
  testDB = await connectTestDB();
  if (testDB == null) {
    throw new Error("failure connection db");
  }
  testDB.query(Users.initTableSql, (_error, _results, _fileds) => {
    done();
  });
});

test("success insert", async (done) => {
  if (testDB == null) {
    throw new Error("failure connection db");
  }
  const testUser = {
    uid: "gin2798@gmail.com",
    name: "gin",
    password: "password",
  };

  // test
  await insertUser(testDB, testUser);

  const queryResult = await execQuery(
    testDB,
    `SELECT * FROM ${Users.TABLE_NAME}`
  );
  const actualUser: User = { ...queryResult.results[0] };
  expect(actualUser.uid).toBe(testUser.uid);
  expect(actualUser.password).toBe(testUser.password);
  expect(actualUser.name).toBe(testUser.name);
  done();
});

test.skip("duplicate uid", async () => {
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
  await expect(insertUser(testDB, testUser)).rejects.toThrow(Error);
});

afterAll((done) => {
  if (testDB == null) {
    throw new Error("failure connection db");
  }
  testDB.query(`DROP TABLE ${Users.TABLE_NAME}`, () => {
    // これがないと jest から怒られる!!!
    testDB?.end();
    done();
  });
});
