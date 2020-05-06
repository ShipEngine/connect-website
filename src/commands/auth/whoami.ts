import Command from "../../command";
// import { flags } from "@heroku-cli/command";

export default class AuthWhoami extends Command {
  static description = "display the current logged in user";

  static aliases = ["whoami"];

  async run() {
    this.log("i know who you are");
  }
}
