// import { flags } from "@oclif/command";
import BaseCommand from "../../base-command";
import chalk from "chalk";
import { flags } from "@oclif/command";
import testApp from "../../shipengine-core/test-app";
import loadAndValidateApp from "../../shipengine-core/load-and-validate-app";

export default class Test extends BaseCommand {
  static description = "test your app";

  static examples = ["$ shipengine apps:test"];

  static flags = {
    help: flags.help({ char: "h" }),
    debug: flags.boolean({
      char: "d",
      description: "logs additional debug information",
    }),
    concurrency: flags.integer({
      char: "c",
      description: "specify the test concurrency",
      default: 1,
    }),
    grep: flags.string({
      char: "g",
      description:
        "only run test that match this string (e.g. method name or test SHA)",
    }),
    "fail-fast": flags.boolean({
      char: "f",
      description: "stop running the test suite on the first failed test",
      default: false,
    }),
  };

  async run() {
    this.parse(Test);
    const { flags } = this.parse(Test);
    const pathToApp = `${process.cwd()}`;

    try {
      const app = await loadAndValidateApp(pathToApp);

      this.log("✅ App structure is valid");

      await testApp(app, {
        concurrency: flags.concurrency,
        debug: flags.debug,
        failFast: flags["fail-fast"],
        grep: flags.grep,
      });
    } catch (error) {
      switch (error.code) {
        case "INVALID_APP":
          // eslint-disable-next-line no-case-declarations
          const errorsCount = error.errors.length;
          // eslint-disable-next-line no-case-declarations
          const errorsWithInflection = errorsCount > 1 ? "errors" : "error";

          this.log(
            chalk.red(
              `App structure is not valid - ${errorsCount} ${errorsWithInflection} found\n`,
            ),
          );

          error.errors.forEach((errorMessage: string) => {
            this.log(`❌ ${errorMessage} `);
          });
          break;
        case "TESTS_FAILED":
          this.error("TESTS_FAILED");
          break;
        default:
          throw error;
          break;
      }
    }
  }
}
