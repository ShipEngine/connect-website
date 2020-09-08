import * as flush from "@oclif/command/flush";
import * as resolveFrom from "resolve-from";
import * as updateNotifier from "update-notifier";
import * as fs from "fs";
import * as path from "path";
import { handle, exit } from "@oclif/errors";

type ConnectCLI = typeof import("@shipengine/connect-cli");

interface Package {
  version: number;
}

interface PackageJSONLock {
  dependencies: Record<string, Package>;
}

interface PackageJSON {
  name: string;
  version: number;
}

const pjson = JSON.parse(fs.readFileSync(path.join(__dirname, "..", "package-lock.json"), "utf8")) as PackageJSON;
const pjsonLock = JSON.parse(fs.readFileSync(path.join(__dirname, "..", "package-lock.json"), "utf8")) as PackageJSONLock;

/**
 * This is the main entry point of the ShipEngine Connect CLI.
 */
export async function main(args: string[]): Promise<void> {
  try {
    // Check for a new version in the background.
    checkForUpdate();

    // Intercept the version command/flags and handle it here instead of in the connect CLI
    if (['-v', '--version', 'version'].includes(args[0])) return logVersionInfo()

    // Run the CLI
    const cli = await importCLI();
    await cli.run(args);

    // The CLI finished successfully, but there may still be STDIO in process,
    // so flush all remaining STDIO
    await flush();
  }
  catch (error) {
    handle(error);
  }
}


/**
 * Checks for a new version in the background. If there's a new version,
 * the user will be prompted to update when the CLI exits.
 */
function checkForUpdate() {
  // We have to use `require()` here instad of `import`
  // because the "package.json" file is outside of the "src" directory.
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-var-requires
  const pkg = require("../package.json") as updateNotifier.Package;

  const notifier = updateNotifier({
    pkg,
    updateCheckInterval: 1000 * 60 * 60 * 24,   // 1 day
    shouldNotifyInNpmScript: true
  });

  notifier.notify();
}


/**
 * Detects whether there is a locally-installed version of the CLI, and if so, returns
 * the local version. Otherwise, returns the version from this package.
 */
async function importCLI(): Promise<ConnectCLI> {
  const localCLI = resolveFrom.silent(process.cwd(), "@shipengine/connect-cli");

  if (localCLI) {
    return import(localCLI) as Promise<ConnectCLI>;
  }
  else {
    return import("@shipengine/connect-cli");
  }
}

function logVersionInfo() {
  const cliVersion = pjsonLock.dependencies["@shipengine/connect-cli"]["version"];
  const sdkVersion = pjsonLock.dependencies["@shipengine/connect-sdk"]["version"];
  const loaderVersion = pjsonLock.dependencies["@shipengine/connect-loader"]["version"];
  const localDevApiVersion = pjsonLock.dependencies["@shipengine/connect-local-dev-api"]["version"];
  // const localDevUiVersion = pjsonLock.dependencies["@shipengine/connect-local-dev-ui"]["version"];

  console.log(`node                              ${process.version}`);
  console.log(`@shipengine/connect               v${pjson.version}`)
  console.log(`@shipengine/connect-cli           v${cliVersion}`);
  console.log(`@shipengine/connect-sdk           v${sdkVersion}`);
  console.log(`@shipengine/connect-loader        v${loaderVersion}`);
  console.log(`@shipengine/connect-local-dev-api v${localDevApiVersion}`);
  // console.log(`@shipengine/connect-local-dev-ui ${localDevUiVersion}`);

  exit(0)
}
