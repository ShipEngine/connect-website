import { manifest } from "../manifest";

const cli = Object.keys(manifest.bin)[0];

/**
 * Text explaining how to use the IPAAS CLI
 */
export const usageText = `
Usage: ${cli} ipaas [options] <command> [parameters]

options:

-h, --help                Show usage information
-v, --versions            Show the version number

commands:
  new   create new project to develop a custom ShipEngine IPaaS integration
`;

/**
 * Text describing the program and how to use it
 */
export const ipaasHelpText = `
${manifest.name} - ${manifest.description}
${usageText}`;
