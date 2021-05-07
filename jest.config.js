module.exports = {
  transform: {
    "^.+\\.ts$": "ts-jest",
  },
  testRegex: "((\\.|/)(test|spec))\\.[jt]sx?$",
  moduleDirectories: ["./src", "./node_modules"],
};
