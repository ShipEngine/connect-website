import BaseCommand from "../../base-command";
import { flags } from "@oclif/command";

export default class Whoami extends BaseCommand {
  static description = "display the current logged in user";

  static aliases = ["whoami"];

  static flags = {
    help: flags.help({
      char: "h",
      description: "show help for the auth:whoami command",
    }),
  };

  async run() {
    // When the -h flag is present the following line haults execution
    this.parse(Whoami);

    try {
      const currentUser = await this.currentUser();
      this.log(`\nyou are currently logged in as: ${currentUser.email}`);
    } catch {
      return this.error("\nyou are not currently logged in", {
        exit: 1,
      });
    }
  }
}
