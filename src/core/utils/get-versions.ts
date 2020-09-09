interface PJson {
  name: string;
  version: string;
  description?: string;
  dependencies: Record<string, string>;
}

export default function getVersions(): Record<string, string> {
  // We have to use `require()` here instad of `import`
  // because the "package.json" file is outside of the "src" directory.
  const cliPjson = require("../../../package.json") as PJson;

  const sdkPjson = require("@shipengine/connect-sdk/package.json") as PJson;

  const loaderPjson = require("@shipengine/connect-loader/package.json") as PJson;

  const localDevApiPjson = require("@shipengine/connect-local-dev-api/package.json") as PJson;

  const localDevUiPjson = require("@shipengine/connect-local-dev-ui/package.json") as PJson;

  return {
    "node": process.version,
    "@shipengine/connect-cli": cliPjson.version,
    "@shipengine/connect-sdk": sdkPjson.version,
    "@shipengine/connect-loader": loaderPjson.version,
    "@shipengine/connect-local-dev-api": localDevApiPjson.version,
    "@shipengine/connect-local-dev-ui": localDevUiPjson.version
  }
}
