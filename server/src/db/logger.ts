export function insertLog(tableName: string, data: any) {
  const dataStr = JSON.stringify(data);
  console.log(`info: insert\ntable: ${tableName}\ninserted data:${dataStr}`);
}
