import { manifest } from "../manifest";

const cli = Object.keys(manifest.bin)[0];

/**
 * Text explaining how to use the CLI
 */
export const usageText = `
Usage: ${cli} [options] <command> <subcommand> [parameters]

options:
  -v, --versions            Show the version number

  -h, --help                Show usage information

commands:
  ipaas   create, manage, test, and deploy a ShipEngine IPaaS integration
  help    display help text for ShipEngine
`;

/**
 * Text describing the program and how to use it
 */
export const shipEngineHelpText = `
${manifest.name} - ${manifest.description}
${usageText}`;
