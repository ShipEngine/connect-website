const appLoader = require("@shipengine/integration-platform-loader");
let app;

const loadApp = async function loadApp(){
  if(!app) {
    app = await appLoader.loadApp(process.cwd());
  }

  return app;
}

module.exports = loadApp;