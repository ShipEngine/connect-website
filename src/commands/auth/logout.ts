import BaseCommand from "../../base-command";
// import { flags } from "@heroku-cli/command";

export default class Logout extends BaseCommand {
  static description =
    "clears local login credentials and invalidates API session";

  static aliases = ["logout"];

  // hide the command from help
  static hidden = true;

  async run() {
    this.log("you have been logged out");
  }
}
