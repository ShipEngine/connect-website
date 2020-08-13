import BaseCommand from "../base-command";
import { flags } from "@oclif/command";
import cli from "cli-ux";
import * as ApiKeyStore from "../core/api-key-store";
import { Domain } from '../core/api-key-store';
import { setUser } from '../core/utils/users';

export default class Login extends BaseCommand {
  static description = "login with your connect API key";

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

    const apiKey = await cli.prompt(
      "please enter your API key",
      {
        type: "mask",
      }
    );

    await setUser(Domain.Apps, apiKey, this);

    try {
      cli.action.start("verifying account");
      await this.currentUser();
      // Would rather use a /ping or /status endpoint here
    } catch {

      ApiKeyStore.clear(Domain.Apps);
      return this.error("the given API key is not valid", {
        exit: 1,
      });
    } finally {
      cli.action.stop();
    }

    this.log("\nyou have logged in with a Connect API key");
  }
}
