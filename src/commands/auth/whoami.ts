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

    let appUser;
    let shipEngineUser;

    try {
      console.log("DEBUG: calling se client")

      shipEngineUser = await this.currentShipEngineUser();
    } catch(error) {
      console.log("error");
    }

    try {
      console.log("DEBUG: calling app client")
      appUser = await this.currentAppUser();
    } catch(error) {
      console.log("error");
    }


    if (appUser && shipEngineUser) {
      this.log(`\nyou are currently logged in as the following:\n`);

      this.log(`shipengine ⚙ : ${shipEngineUser}`);
      this.log(`auctane 🏎  🔥 : ${appUser}`);
    }
    else if (appUser) {
      this.log(`\nyou are currently logged in as: ${appUser}`);
    }
    else if (shipEngineUser) {
      this.log(`\nyou are currently logged in as: ${shipEngineUser}`);
    }
    else {
      return this.error("\nyou are not currently logged in", {
        exit: 1,
      });
    }
  }
}
