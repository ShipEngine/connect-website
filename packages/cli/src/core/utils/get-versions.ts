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

  return {
    "node": process.version,
    "@shipengine/connect-cli": `v${cliPjson.version}`,
    "@shipengine/connect-sdk": `v${sdkPjson.version}`,
    "@shipengine/connect-loader": `v${loaderPjson.version}`,
  }
}
