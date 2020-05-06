import Command from "../../command";
// import { flags } from "@heroku-cli/command";

export default class Logout extends Command {
  static description =
    "clears local login credentials and invalidates API session";

  static aliases = ["logout"];

  async run() {
    this.log("you have been logged out");
  }
}
