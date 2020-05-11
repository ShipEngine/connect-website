import BaseCommand from "../../base-command";
// import { flags } from "@oclif/command";

export default class Publish extends BaseCommand {
  static description = "publish your app";

  static examples = ["$ shipengine apps:publish"];

  // hide the command from help
  static hidden = true;

  async run() {
    this.log("doing all the things");
  }
}
