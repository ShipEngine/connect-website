import BaseCommand from "../../base-command";
import { loadApp } from "@shipengine/integration-platform-loader";
// import { flags } from "@oclif/command";
// import { testApp } from "../../shipengine-core/test-app";

export default class Test extends BaseCommand {
  static description = "test your app";

  static examples = ["$ shipengine apps:test"];

  async run() {
    const pathToApp = `${process.cwd()}`;

    try {
      const app = await loadApp(pathToApp);
      this.log(`Successfully loaded ${app.name} v${app.version}`);
    } catch (error) {
      error.log(error);
    }
  }
}
