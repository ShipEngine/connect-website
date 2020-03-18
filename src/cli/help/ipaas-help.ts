import { manifest } from "../manifest";

const cli = Object.keys(manifest.bin)[0];

/**
 * Text explaining how to use the IPAAS CLI
 */
export const usageText = `
Usage: ${cli} [options] <command> <subcommand> [parameters]

options:

-h, --help                Show usage information
-v, --version             

COMMANDS
  ipaas   create, manage, test, and deploy a ShipEngine IPaaS integration
`;

/**
 * Text describing the program and how to use it
 */
export const helpText = `
${manifest.name} - ${manifest.description}
${usageText}`;
