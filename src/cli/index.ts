// tslint:disable: no-console
import { shipengine } from "..";
import { ExitCode } from "./exit-code";
import { helpText } from "./help/shipengine-help";
import { manifest } from "./manifest";
import { parseArgs } from "./parse-args";

/**
 * The main entry point of the CLI
 *
 * @param args - The command-line arguments
 */
export async function main(args: string[]): Promise<void> {
  try {
    // Setup global error handlers
    process.on("uncaughtException", errorHandler);
    process.on("unhandledRejection", errorHandler);

    // Parse the command-line arguments
    let { help, version, quiet, options } = parseArgs(args);

    if (help) {
      // Show the help text and exit
      console.log(helpText);
      process.exit(ExitCode.Success);
    }
    else if (version) {
      // Show the version number and exit
      console.log(manifest.version);
      process.exit(ExitCode.Success);
    }
    else {
      await shipengine(options);
    }
  }
  catch (error) {
    errorHandler(error as Error);
  }
}

/**
 * Prints errors to the console
 */
function errorHandler(error: Error): void {
  let message = error.message || String(error);

  if (process.env.DEBUG || process.env.NODE_ENV === "development") {
    message = error.stack || message;
  }

  console.error(message);
  process.exit(ExitCode.FatalError);
}
