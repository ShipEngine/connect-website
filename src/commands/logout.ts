import BaseCommand from "../base-command";
import { flags } from "@oclif/command";
import { clearUser } from "../core/utils/users";

export default class Logout extends BaseCommand {
  static description = "clears the local Integrations API key";

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

    clearUser();
  }
}
