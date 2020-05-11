import BaseCommand from "../../base-command";
// import { flags } from "@heroku-cli/command";

export default class Login extends BaseCommand {
  static description = "login with your ShipEngine credentials";

  static aliases = ["login"];

  // hide the command from help
  static hidden = true;

  async run() {
    this.log("you have been logged in");
  }
}
