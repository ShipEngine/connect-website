import * as ApiKeyStore from "../../core/api-key-store";
import BaseCommand from "../../base-command";
import cli from "cli-ux";
import { flags } from "@oclif/command";
import { Domain } from '../../core/api-key-store';

export default class Logout extends BaseCommand {
  static description = "clears the local API key";

  static aliases = ["logout"];

  static flags = {
    help: flags.help({
      char: "h",
      description: "show help for the auth:logout command",
    }),
  };

  async run() {
    // When the -h flag is present the following line haults execution
    this.parse(Logout);

    cli.action.start("Logging out");

    ApiKeyStore.clear(Domain.Apps);

    cli.action.stop();

    this.log("\nYou have been logged out.");
  }
}
