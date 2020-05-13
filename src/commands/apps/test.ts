import BaseCommand from "../../base-command";
// import { flags } from "@oclif/command";
import {
  validateApp,
  validateTestSuite,
  InvalidAppError,
} from "../../shipengine-core/validate-app";
import chalk from "chalk";
import { App } from "@shipengine/integration-platform-loader";

export default class Test extends BaseCommand {
  static description = "test your app";

  static examples = ["$ shipengine apps:test"];

  async run() {
    const pathToApp = `${process.cwd()}`;

    let app: App;

    try {
      app = await validateApp(pathToApp);
      this.log("✅ App structure is valid");
    } catch (error) {
      if (error instanceof InvalidAppError) {
        this.log(
          chalk.red(
            `App structure is not valid - ${error.errors.length} errors found\n`,
          ),
        );

        error.errors.forEach((errorMessage: string) => {
          this.log(`❌ ${errorMessage} `);
        });
      } else {
        this.error(error);
      }
    }

    // Check for real world correctness
    //  ›   All UUIDs are unique
    //  ›

    // Run test suite

    try {
      await validateTestSuite(app);
    } catch (error) {
      throw error;
    }
  }
}
