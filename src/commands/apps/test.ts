import BaseCommand from "../../base-command";
import loader from "@shipengine/integration-platform-loader";
// import path from "path";
// import { flags } from "@oclif/command";

export default class Test extends BaseCommand {
  static description = "test your app";

  static examples = ["$ shipengine apps:test"];

  async run() {
    const pathToApp = `${process.cwd()}`;
    let app = await loader.loadApp(pathToApp);
    this.log(`Successfully loaded ${app.name} v${app.version}`);
  }
}
