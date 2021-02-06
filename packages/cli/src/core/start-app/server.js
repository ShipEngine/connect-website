// NOTE - this file must be a JavaScript file
// because Oclif is using ts-node in development
// and we are unable to execute a script as a TypeScript file

"use strict";

// eslint-disable-next-line node/no-missing-require
const server = require("@shipengine/connect-local-dev-api")
  .default;

const pathToApp = process.argv[2];
const port = process.argv[3];

server(port, pathToApp);
