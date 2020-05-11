import BaseCommand from "../../../base-command";
import { flags } from "@oclif/command";

export default class VersionsIndex extends BaseCommand {
  static description = "list versions belonging to an app";

  static examples = ["$ shipengine apps:versions"];

  static flags = {
    help: flags.help({ char: "h" }),
  };

  // hide the command from help
  static hidden = true;

  async run() {
    // When the -h flag is present the following line haults execution
    this.parse(VersionsIndex);

    this.log("versions 1, 2, 3");
  }
}
