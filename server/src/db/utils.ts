export function afterExec(error: any, results: any, fields: any) {
  if (error) {
    throw error;
  }
  console.log("executed SQL:", results);
}
