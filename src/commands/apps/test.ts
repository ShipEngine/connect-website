import BaseCommand from "../../base-command";
// import { flags } from "@oclif/command";
import {
  validateAppWillLoad,
  ValidationError,
} from "../../shipengine-core/validate-app";
import chalk from "chalk";

export default class Test extends BaseCommand {
  static description = "test your app";

  static examples = ["$ shipengine apps:test"];

  async run() {
    const pathToApp = `${process.cwd()}`;

    try {
      await validateAppWillLoad(pathToApp);
      this.log("✅ App structure is valid");
    } catch (error) {
      if (error instanceof ValidationError) {
        this.log(
          chalk.redBright(
            `App structure is not valid - ${error.errors.length} errors found\n`,
          ),
        );

        error.errors.forEach((errorMessage) => {
          this.log(`❌ ${errorMessage} `);
        });
      } else {
        this.error(error);
      }
    }
  }
}
