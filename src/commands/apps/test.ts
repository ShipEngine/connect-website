import BaseCommand from "../../base-command";
// import { flags } from "@oclif/command";
import { runAppTests } from "../../shipengine-core/run-app-tests";

export default class Test extends BaseCommand {
  static description = "test your app";

  static examples = ["$ shipengine apps:test"];

  async run() {
    const pathToApp = `${process.cwd()}`;

    try {
      await runAppTests(pathToApp);
      this.log("ok");
    } catch (error) {
      this.error(error);
    }
  }
}
