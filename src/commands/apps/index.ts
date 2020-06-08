import BaseCommand from "../../base-command";
import { flags } from "@oclif/command";

export default class AppsIndex extends BaseCommand {
  static description = "list your apps";

  static flags = {
    help: flags.help({ char: "h" }),
  };

  // hide the command from help
  static hidden = true;

  async run() {
    // When the -h flag is present the following line haults execution
    this.parse(AppsIndex);
  }
}
