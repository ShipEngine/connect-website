import BaseCommand from "../../base-command";
import {
  validateApp,
  validateTestSuite,
  InvalidAppError,
} from "../../shipengine-core/validate-app";
import chalk from "chalk";
import { flags } from "@oclif/command";
import { testSuites } from "../../shipengine-core/validate-app"

export default class Test extends BaseCommand {
  static description = "test your app";

  static examples = ["$ shipengine apps:test"];

  static flags = {
    help: flags.help({ char: "h" }),
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

    if (flags.debug) {
      process.env["TEST_DEBUG"] = "true";
    }

    let app;

    try {
      app = await validateApp(pathToApp);
      this.log("✅ App structure is valid");
    } catch (error) {
      if (error instanceof InvalidAppError) {
        const errorsCount = error.errors.length;
        const errorsWithInflection = errorsCount > 1 ? "errors" : "error";

        this.log(
          chalk.red(
            `App structure is not valid - ${errorsCount} ${errorsWithInflection} found\n`,
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

    if (app) {
      try {
        await validateTestSuite(app, argv);
      } catch (error) {
        throw error;
      }
    }
  }
}
