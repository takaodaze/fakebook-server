/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Post } from "db/type";
import * as Posts from "db/Posts";
import { Connection } from "mysql";
import {
  connectTestDB,
  dropTableUtil,
  execQueryFactory,
  ExecQueryFunc,
} from "./utils";

let testDB: Connection;
let execQuery: ExecQueryFunc;

beforeAll(async () => {
  testDB = await connectTestDB();
  execQuery = execQueryFactory(testDB);
  await execQuery(Posts.initTableSql);
});

test("insert a post", async () => {
  const testUid = "gin2798@gmail.com";
  const testDescription = "hogehogehogheogefdsafas; 本日は晴天なり";
  await Posts.create(testDB, testUid, testDescription);

  const queryResult = await execQuery(`SELECT * FROM ${Posts.TABLE_NAME}`);

  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  const actualPost: Post = { ...queryResult.results[0] } as Post;
  expect(actualPost.uid).toBe(testUid);
  expect(actualPost.description).toBe(testDescription);
});

test("is enable auto icrement of post_id ??", async () => {
  const testUid = "test1@gmail.com";
  const testDescription = "hogehogehogheogefdsafas; 本日は晴天なり";
  const testUid2 = "test2@gmail.com";
  const testDescription2 = "hogehogehogheogefdsafas; 本日は晴天なり";

  // 以下、2行が例外発生なく終われば正常である
  await Posts.create(testDB, testUid, testDescription);
  await Posts.create(testDB, testUid2, testDescription2);

  const queryResult = await execQuery(
    `SELECT * FROM ${Posts.TABLE_NAME} WHERE uid='${testUid}'`
  );
  const queryResult2 = await execQuery(
    `SELECT * FROM ${Posts.TABLE_NAME} WHERE uid='${testUid2}'`
  );

  console.log(queryResult);
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  const actualPostId = { ...queryResult.results[0] }["post_id"] as number;
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  const actualPostId2 = { ...queryResult2.results[0] }["post_id"] as number;

  // 2つの投稿ID が異なれば正常である
  expect(actualPostId).not.toBe(actualPostId2);
});

afterAll(async () => {
  await dropTableUtil(execQuery, Posts.TABLE_NAME);
  testDB.end();
});
