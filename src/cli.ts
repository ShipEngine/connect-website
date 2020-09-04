import * as flush from "@oclif/command/flush";
import { handle } from "@oclif/errors";
import * as resolveFrom from "resolve-from";

type ConnectCLI = typeof import("@shipengine/connect-cli");

/**
 * This is the main entry point of the ShipEngine Connect CLI.
 * It detects whether there is a locally-installed version of the CLI,
 * and if there is one, then the local version is used. Otherwise, the
 * globally-installed version of the CLI is used.
 */
export async function main(args: string[]): Promise<void> {
  try {
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
