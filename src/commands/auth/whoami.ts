import BaseCommand from "../../base-command";
// import { flags } from "@heroku-cli/command";

export default class AuthWhoami extends BaseCommand {
  static description = "display the current logged in user";

  static aliases = ["whoami"];

  // hide the command from help
  static hidden = true;

  async run() {
    this.log("i know who you are");
  }
}
