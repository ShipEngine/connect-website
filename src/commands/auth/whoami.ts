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

    if (this.shipengineClient) {
      shipEngineUser = await this.currentShipEngineUser();
    }

    if (this.appsClient) {
      appUser = await this.currentAppUser();
    }

    if (appUser && shipEngineUser) {
      this.log(`\nyou are currently logged in as the following:\n`);

      this.log(`shipengine ⚙ : ${shipEngineUser.username}`);
      this.log(`integrations : ${appUser.name}`);
    }
    else if (appUser) {
      this.log(`\nyou are currently logged in as: ${appUser.name}`);
    }
    else if (shipEngineUser) {
      this.log(`\nyou are currently logged in as: ${shipEngineUser.username}`);
    }
    else {
      return this.error("\nyou are not currently logged in", {
        exit: 1,
      });
    }
  }
}
