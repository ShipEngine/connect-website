import * as flush from "@oclif/command/flush";
import { handle } from "@oclif/errors";
import * as resolveFrom from "resolve-from";
import * as updateNotifier from "update-notifier";

type ConnectCLI = typeof import("@shipengine/connect-cli");

/**
 * This is the main entry point of the ShipEngine Connect CLI.
 */
export async function main(args: string[]): Promise<void> {
  try {
    // Check for a new version in the background.
    checkForUpdate();

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
