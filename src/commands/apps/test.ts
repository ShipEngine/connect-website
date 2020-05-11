import BaseCommand from "../../base-command";
// import { flags } from "@oclif/command";

export default class Test extends BaseCommand {
  static description = "test your app";

  static examples = ["$ shipengine apps:test"];

  async run() {
    this.log("testint 1, 2, 3");
  }
}
