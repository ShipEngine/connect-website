import BaseCommand from "../base-command";
import testApp, { TestAppErrors } from "../core/test-app";
import { flags } from "@oclif/command";
import chalk from "chalk";

export default class Test extends BaseCommand {
  static description = "Test your app";

  static examples = ["$ connect test", "$ connect test --grep rateShipment"];

  static flags = {
    help: flags.help({
      char: "h",
      description: "Show help for the test command",
    }),
    debug: flags.boolean({
      char: "d",
      description: "Logs additional debug information",
    }),
    timeout: flags.integer({
      char: "t",
      description: "Specify the timeout for all the test",
    }),
    retries: flags.integer({
      char: "r",
      description: "Specify the retries for all the test",
    }),
    grep: flags.string({
      char: "g",
      description: "Only run test that match the given string",
    }),
    "fail-fast": flags.boolean({
      char: "f",
      description: "Stop running the test suite on the first failed test",
    }),
  };

  async run(): Promise<void> {
    this.parse(Test);
    const { flags } = this.parse(Test);
    const { "fail-fast": failFast, debug, grep, retries, timeout } = flags;
    const pathToApp = process.cwd();

    try {
      const results = await testApp(pathToApp, {
        debug,
        failFast,
        grep,
        retries,
        timeout,
      });

      if (results.failed > 0) {
        return this.exit(1);
      }
    } catch (error) {
      switch (error.code) {
        case TestAppErrors.SchemaInvalid:
          this.log(chalk.red("connect.config.js is not valid"));
          error.details.map((detail: any) =>
            this.log(chalk.red(`    - ${detail.message}`)),
          );
          return this.exit(1);
        default:
          throw error;
      }
    }
  }
}
