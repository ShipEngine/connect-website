import * as ApiKeyStore from "../../core/api-key-store";
import BaseCommand from "../../base-command";
import cli from "cli-ux";
import { flags } from "@oclif/command";
import { Domain } from '../../core/api-key-store';
import * as inquirer from 'inquirer'

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
      this.log(`auctane 🏎  🔥 : ${appUser.name}`);

      let responses: any = await inquirer.prompt([{
        name: "api-token",
        message: "which user would you like to logout?",
        type: "list",
        choices: [
          {
            name: `${shipEngineUser?.username}`,
            value: "shipengine"
          },
          {
            name: `${appUser.name}`,
            value: "apps"
          },
          {
            name: "Both",
            value: "both"
          }
        ],
      }]);

      if (responses["api-token"] === "shipengine") {
        cli.action.start("logging out of shipengine  ⚙ ");
        ApiKeyStore.clear(Domain.ShipEngine);
        cli.action.stop();
      }
      else if (responses["api-token"] === "apps") {
        cli.action.start("logging out of auctane 🏎  🔥 ");
        ApiKeyStore.clear(Domain.Apps);
        cli.action.stop();
      }
      else {
        cli.action.start("logging out of auctane 🏎  🔥 ");
        ApiKeyStore.clear(Domain.Apps);
        cli.action.stop();

        cli.action.start("logging out of shipengine  ⚙ ");
        ApiKeyStore.clear(Domain.ShipEngine);
        cli.action.stop();
      }
    }
    else if (appUser) {
      cli.action.start("logging out of auctane 🏎  🔥 ");
      ApiKeyStore.clear(Domain.ShipEngine);
      cli.action.stop();
    }
    else if (shipEngineUser) {
      cli.action.start("logging out of shipengine  ⚙ ");
      ApiKeyStore.clear(Domain.ShipEngine);
      cli.action.stop();
    }
  }
}
