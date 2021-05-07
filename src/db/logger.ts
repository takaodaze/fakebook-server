export type ExecuteType = "INSERT" | "SELECT" | "UPDATE" | "DELETE";

export function log(
  excuteType: ExecuteType,
  tableName: string,
  data: { [key: string]: string | number | boolean }
): void {
  const dataStr = JSON.stringify(data);
  switch (excuteType) {
    case "INSERT":
      console.info(
        `info: insert\ntable: ${tableName}\ninserted data:${dataStr}`
      );
      break;

    default:
      throw new Error("execute-type-is-not-declared");
  }
}
