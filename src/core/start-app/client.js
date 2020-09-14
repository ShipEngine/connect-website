#!/usr/bin/env node

// NOTE - this file must be a JavaScript file
// because Oclif is using ts-node in development
// and we are unable to execute a script as a TypeScript file

"use strict";

const express = require("express");
const fs = require('fs');
const openBrowser = require('./open-browser')
const ui = require("@shipengine/connect-local-dev-ui");

function main(clientPort, serverPort) {
  const client = express();
  const clientHost = `http://localhost:${clientPort}`;

  // The local dev UI needs to know about the server API host dynamically
  // The local dev UI use https://www.npmjs.com/package/@beam-australia/react-env
  // to dynamically set and read ENV variables at runtime.
  // The following line overwrites the env.js file everytime the local dev UI starts.
  fs.writeFileSync(`${ui.directoryPath}/env.js`, `window._env = {"NODE_ENV":"development","REACT_APP_API_HOST":"http://localhost:${serverPort}"};`, { encoding: 'utf8', flag: 'w' })

  client.use(express.static(ui.directoryPath));

  client.listen(clientPort, () =>
    console.log(`Starting Local Dev UI...`),
  );

  openBrowser(clientHost);
}

const clientPort = process.argv[2];
const serverPort = process.argv[3];

main(clientPort, serverPort);
