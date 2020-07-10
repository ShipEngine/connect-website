import BaseCommand from "../../base-command";
import { flags } from "@oclif/command";
import cli from "cli-ux";
import * as ApiKeyStore from "../../core/api-key-store";
import { Domain } from '../../core/api-key-store';

export default class Login extends BaseCommand {
  static description = "login with your ShipEngine API key";

  static aliases = ["login"];

  static flags = {
    help: flags.help({
      char: "h",
      description: "show help for the auth:login command",
    }),
  };

  async run() {
    // When the -h flag is present the following line haults execution
    this.parse(Login);

    // try {
    //   const currentUser = await this.currentUser();
    //   this.log(`\nyou are currently logged in as: ${currentUser.email}`);
      
    //   const wishToContinue = await cli.prompt(
    //     "\nwould you like to login as someone else? (y,n)",
    //   );

    //   // if (wishToContinue !== "n" && wishToContinue !== "y") {
    //   //   this.error(
    //   //     `'${wishToContinue}' is not a valid option, please enter 'y' or 'n'`,
    //   //     { exit: 1 },
    //   //   );
    //   //   return;
    //   // }
    //   // if (wishToContinue === "n") {
    //   //   this.log(`\nyou will remained logged in as: ${currentUser.email}`);
    //   //   return;
    //   // }
    // } catch {
    //   // No account currently logged in
    //   ApiKeyStore.clear(Domain.Apps);
    // }

    const apiKey = await cli.prompt(
      "please enter your shipengine engine API key",
      {
        type: "mask",
      },
    );

    if (typeof apiKey === "string" && apiKey.includes("app_")) {

    }

    try {
      await ApiKeyStore.set(Domain.Apps, apiKey);
    } catch (error) {
      ApiKeyStore.clear(Domain.Apps);
      this.error(error, { exit: 1 });
    }

    try {
      cli.action.start("verifying account");
      // Would rather use a /ping or /status endpoint here
      // await this.currentAppUser();
    } catch {
      ApiKeyStore.clear(Domain.Apps);
      return this.error("the given API key is not valid", {
        exit: 1,
      });
    } finally {
      cli.action.stop();
    }

    this.log("\nyou have successfully logged in");
  }
}
