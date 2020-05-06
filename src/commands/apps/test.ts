import Command from "../../command";
// import { flags } from "@oclif/command";

export default class Test extends Command {
  static description = "test your app";

  static examples = ["$ shipengine apps:test"];

  async run() {
    this.log("testing 1, 2, 3");
  }
}
