const express = require("express");
const { buildAPI } = require("./build-api");
const { loadApp } = require("@shipengine/integration-platform-loader");

async function startServer(pathToApp, port) {
  const server = express();

  try {
    const sdkApp = await loadApp(pathToApp);
    buildAPI(sdkApp, server);
  } catch (error) {
    // TODO - consider how this should work
    // We want an app to have the ability to boot up even if it is not valid
    // But I think we only want to boot up if we are in a valid app directory
    console.log("Error building API from SDK");
    console.log(error.stack);
  }

  server.listen(port, () =>
    console.log(`server running at http://localhost:${port}`),
  );
}

const pathToApp = process.argv[2];
const port = process.argv[3];

startServer(pathToApp, Number(port));
