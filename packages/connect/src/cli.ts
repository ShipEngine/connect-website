import flush from "@oclif/command/flush";
import updateNotifier from "update-notifier";
import { handle } from "@oclif/errors";
import { run as cli } from "@oclif/command";

/**
 * This is the main entry point of the ShipEngine Connect CLI.
 */
export async function main(args: string[]): Promise<void> {
  try {
    // Check for a new version in the background.
    checkForUpdate();

    // Intercept the version command/flags and re-route to the CLI versions command
    if (['-v', '--version', 'version'].includes(args[0])) {
      args = ['versions']
    }

    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
    await cli(args);

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
