import BaseCommand from "../base-command";
import { flags } from "@oclif/command";

export default class Whoami extends BaseCommand {
  static description = "Display the current logged in user";

  static aliases = ["whoami"];

  static flags = {
    help: flags.help({
      char: "h",
      description: "Show help for the whoami command",
    }),
    debug: flags.boolean({
      char: "d",
      description: "Show network debugging information",
      default: false,
      hidden: true
    }),
  };

  async run(): Promise<void> {
    // When the -h flag is present the following line haults execution
    const { flags } = this.parse(Whoami);

    try {
      const appUser = await this.getCurrentUser(flags.debug);

      this.log(`You are currently logged in as: ${appUser.name}`);
    } catch (error) {
      return this.error("You are not currently logged in", {
        exit: 1,
      });
    }
  }
}
