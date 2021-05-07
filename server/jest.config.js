module.exports = {
  transform: {
    "^.+\\.ts$": "ts-jest",
  },
  testRegex: "((\\.|/)(test|spec))\\.[jt]sx?$",
  moduleDirectories: ["node_modules", "src"],
  silent: false,
};
