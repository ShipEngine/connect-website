import Command from "../../command";
import { flags } from "@oclif/command";

export default class AppsIndex extends Command {
  static description = "list your apps";

  static examples = [
    `$ shipengine apps
ups-carrier-app
fedex-carrier-app`,
  ];

  static flags = {
    help: flags.help({ char: "h" }),
  };

  async run() {
    // When the -h flag is present the following line haults execution
    this.parse(AppsIndex);

    this.log("ups-carrier-app\nfedex-carrier-app");
  }
}
