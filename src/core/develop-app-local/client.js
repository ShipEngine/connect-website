"use strict";

const express = require("express");
const ui = require("@shipengine/shipengine-integration-platform-local-dev-ui");
const { workerData } = require("worker_threads");

function startClient(port) {
  const client = express();

  client.use(express.static(ui.directoryPath));

  client.listen(port, () =>
    console.log(`client running at http://localhost:${port}`),
  );
}

const { port } = workerData;

startClient(port);
