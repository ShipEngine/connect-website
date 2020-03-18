// tslint:disable: no-console
import * as commandLineArgs from "command-line-args";
import { Options } from "..";
import { ExitCode } from "./exit-code";
import { usageText } from "./help/shipengine-help";

/**
 * The parsed command-line arguments
 */
export interface ParsedArgs {
  help: boolean;
  version: boolean;
  quiet: boolean;
  options?: Options;
}

/**
 * Parses the command-line arguments
 */
export function parseArgs(argv: string[]): ParsedArgs {
  try {

    const shipEngineDefinitions = [
      { name: "quiet", alias: "q", type: Boolean },
      { name: "version", alias: "v", type: Boolean },
      { name: "help", alias: "h", type: Boolean },
      { name: "command", defaultOption: true }
    ];

    const mainOptions = commandLineArgs(
      shipEngineDefinitions,
      {
        argv,
        stopAtFirstUnknown: true
      }
    );

    let parsedArgs: ParsedArgs = {
      help: Boolean(mainOptions.help),
      version: Boolean(mainOptions.version),
      quiet: Boolean(mainOptions.quiet),
      options: {}
    };

    if (mainOptions.command === "ipaas") {
      const secondaryArgs = mainOptions._unknown || [];

      const ipaasDefinitions = [
        { name: "help", alias: "h", type: Boolean },
        { name: "command", defaultOption: true }
      ];


      const ipaasOptions = commandLineArgs(
        ipaasDefinitions,
        {
          argv: secondaryArgs,
          stopAtFirstUnknown: true
        }
      );

      if (ipaasOptions.command === "new") {
        parsedArgs.options!.ipaas = { new: true };
      }

    }
    return parsedArgs;

  }
  catch (error) {
    // There was an error parsing the command-line args
    return errorHandler(error as Error);
  }
}

function errorHandler(error: Error): never {
  console.error(error.message);
  console.error(usageText);
  return process.exit(ExitCode.InvalidArgument);
}
