import Command from "../../command";
// import { flags } from "@heroku-cli/command";

export default class Login extends Command {
  static description = "login with your ShipEngine credentials";

  static aliases = ["login"];

  async run() {
    this.log("you have been logged in");
  }
}
