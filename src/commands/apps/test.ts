import BaseCommand from "../../base-command";
// import { flags } from "@oclif/command";
import {
  validateApp,
  validateTestSuite,
  InvalidAppError,
} from "../../shipengine-core/validate-app";
import chalk from "chalk";
import { App } from "@shipengine/integration-platform-loader";
import { flags } from "@oclif/command";
import { testSuites } from "../../shipengine-core/validate-app"
let app: App;

export default class Test extends BaseCommand {
  static description = "test your app";

  static examples = ["$ shipengine apps:test"];

  static flags = {
    help: flags.help({char: "h"}),
    debug: flags.boolean({
      char: "d",
      description: "Provides additional logs to test output"
    })
  }

  static args = [
    {
      name: "test suite",
      required: false,
      description: "Name of test suite to only run",
      options: testSuites
    },
    {
      name: "test number",
      required: false,
      description: "Number within the test suite to run"
    }
  ]

  async run() {
    const pathToApp = `${process.cwd()}`;

    const { argv, flags } = this.parse(Test);

    if(flags.debug) {
      process.env["TEST_DEBUG"] = "true";
    }

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
      await validateTestSuite(app, argv);
    } catch (error) {
      throw error;
    }
  }
}
