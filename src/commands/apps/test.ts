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

    // Make sure the cwd has a package.json file
    //  ›   Error: Error: Cannot find module '/Users/pierce/package.json'
    //  ›   Require stack: ...

    // Make sure there is a local installation of the SDK
    //  ›   Error: Looks like you're missing a local installation of
    //  ›   @shipengine/integration-platform-sdk. Run `npm install` to resolve

    try {
      await validateAppWillLoad(pathToApp);
      this.log("✅ App structure is valid");
    } catch (error) {
      if (error instanceof ValidationError) {
        this.log(
          chalk.red(
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

    // Check for real world correctness
    //  ›   All UUIDs are unique
    //  ›

    // Run test suite
  }
}
