/**
 * (c) Facebook, Inc. and its affiliates. Confidential and proprietary.
 */

module.exports = {
  rootDir: ".",
  testMatch: ["**/__tests__/**/*.test.js"],
  transform: {
    "^.+\\.js$": "babel-jest",
    "^.+\\.tsx?$": "babel-jest"
  }
};
