import { manifest } from "../manifest";

const cli = Object.keys(manifest.bin)[0];

/**
 * Text explaining how to use the CLI
 */
export const usageText = `
Usage: ${cli} [options] <command> <subcommand> [parameters]

options:
  -v, --versions             Show the version number

  -q, --quiet               Suppress unnecessary output

  -h, --help                Show usage information

commands:
  ipaas   create, manage, test, and deploy a ShipEngine IPaaS integration
  help    display help text for ShipEngine
`;

/**
 * Text describing the program and how to use it
 */
export const helpText = `
${manifest.name} - ${manifest.description}
${usageText}`;
