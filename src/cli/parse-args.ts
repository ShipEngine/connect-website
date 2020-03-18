// tslint:disable: no-console
import * as commandLineArgs from "command-line-args";
import { Options } from "..";
import { ExitCode } from "./exit-code";
import { usageText } from "./help/shipengine-help";
import { ipaasHelpText } from "./help/ipaas-help";

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
      help: false,
      version: Boolean(mainOptions.version),
      quiet: Boolean(mainOptions.quiet),
      options: {
        ipaas: {
          new: false,
          help: false
        }
      }
    };

    if (mainOptions.command === "help") {
      parsedArgs.help = true;
    }

    else if (mainOptions.command === "ipaas") {
      const secondaryArgs = (mainOptions._unknown || []).concat(argv.slice(1));
      parseIPAASArgs(secondaryArgs, parsedArgs);
    }

    // If there are no sub-commands then parse then set the root level options
    else {
      parsedArgs.help = Boolean(mainOptions.help);
      parsedArgs.version = Boolean(mainOptions.version);
      parsedArgs.quiet = Boolean(mainOptions.quiet);
    }

    return parsedArgs;

  }
  catch (error) {
    // There was an error parsing the command-line args
    return errorHandler(error as Error);
  }
}

function parseIPAASArgs(argv: string[], parsedArgs: ParsedArgs): void {
  const ipaasDefinitions = [
    { name: "help", alias: "h", type: Boolean },
    { name: "command", defaultOption: true }
  ];

  const ipaasOptions = commandLineArgs(
    ipaasDefinitions,
    {
      argv,
      stopAtFirstUnknown: true
    }
  );

  parsedArgs.options!.ipaas!.help = Boolean(ipaasOptions.help);

  if (ipaasOptions.command) {
    switch (ipaasOptions.command) {
      case "new":
        parsedArgs.options!.ipaas!.new = true ;
        break;

      case "help":
        parsedArgs.options!.ipaas!.help = true;
        break;

      default:
        console.log("Unrecognized command");
        break;
    }
  }

}

function errorHandler(error: Error): never {
  console.error(error.message);
  console.error(usageText);
  return process.exit(ExitCode.InvalidArgument);
}
