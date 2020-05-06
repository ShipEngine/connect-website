import Command from "../../command";
// import { flags } from "@oclif/command";

export default class Publish extends Command {
  static description = "publish your app";

  static examples = ["$ shipengine apps:publish"];

  async run() {
    this.log("doing all the things");
  }
}
