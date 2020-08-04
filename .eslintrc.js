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
  rules: {
    "no-console": 0,
    "@typescript-eslint/no-use-before-define": 0,
    "valid-jsdoc": 0,
    "no-warning-comments": 0,
    "prefer-promise-reject-errors": 0,
    "no-await-in-loop": 0,
    "no-negated-condition": 0,
    "no-implicit-coercion": 0,
    "new-cap": 0,
    "no-dupe-else-if": 0,
    "no-import-assign": 0,
    "no-setter-return": 0
  }
};