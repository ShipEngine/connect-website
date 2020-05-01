module.exports = {
  env: {
    es6: true,
    node: true,
  },
  extends: [
    "oclif",
    "oclif-typescript",
    "eslint:recommended",
    "prettier",
    "prettier/@typescript-eslint",
  ],
};
