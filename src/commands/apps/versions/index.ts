import Command from "../../../command";
import { flags } from "@oclif/command";

export default class VersionsIndex extends Command {
  static description = "list versions belonging to an app";

  static examples = ["$ shipengine apps:versions"];

  static flags = {
    help: flags.help({ char: "h" }),
  };

  async run() {
    // When the -h flag is present the following line haults execution
    this.parse(VersionsIndex);

    this.log("versions 1, 2, 3");
  }
}
