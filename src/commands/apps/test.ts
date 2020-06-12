import BaseCommand from "../../base-command";
import loadAndValidateApp from "../../core/load-and-validate-app";
import testApp from "../../core/test-app";
import { flags } from "@oclif/command";
import {
  logFail,
  logPass,
  logStep,
  logResults,
} from "../../core/utils/log-helpers";

export default class Test extends BaseCommand {
  static description = "test your app";

  static examples = [
    "$ shipengine apps:test",
    "$ shipengine apps:test --grep rateShipment",
  ];

  static flags = {
    help: flags.help({
      char: "h",
      description: "show help for the apps:test command",
    }),
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
    const pathToApp = process.cwd();

    try {
      logStep("validating app structure");

      const app = await loadAndValidateApp(pathToApp);

      logPass("app structure is valid");

      const results = await testApp(app, {
        concurrency: flags.concurrency,
        debug: flags.debug,
        failFast: flags["fail-fast"],
        grep: flags.grep,
      });

      if (results.failed > 0) {
        return this.exit(1);
      }
    } catch (error) {
      switch (error.code) {
        case "INVALID_APP":
          // eslint-disable-next-line no-case-declarations
          const errorsCount = error.errors.length;
          // eslint-disable-next-line no-case-declarations
          const errorsWithInflection = errorsCount > 1 ? "errors" : "error";

          logFail(
            `App structure is not valid - ${errorsCount} ${errorsWithInflection} found`,
          );

          error.errors.forEach((errorMessage: string) => {
            logFail(errorMessage);
          });

          logResults({ failed: errorsCount, passed: 0, skipped: 0 });
          return this.exit(1);
        default:
          throw error;
      }
    }
  }
}
