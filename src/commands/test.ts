import BaseCommand from "../base-command";
import testApp from "../core/test-app";
import { flags } from "@oclif/command";
export default class Test extends BaseCommand {
  static description = "test your app";

  static examples = [
    "$ connect test",
    "$ connect test --grep rateShipment",
  ];

  static flags = {
    help: flags.help({
      char: "h",
      description: "show help for the test command",
    }),
    debug: flags.boolean({
      char: "d",
      description: "logs additional debug information",
    }),
    timeout: flags.integer({
      char: "t",
      description: "specify the timeout for all the test",
    }),
    retries: flags.integer({
      char: "r",
      description: "specify the retries for all the test",
    }),
    grep: flags.string({
      char: "g",
      description: "only run test that match the given string",
    }),
    "fail-fast": flags.boolean({
      char: "f",
      description: "stop running the test suite on the first failed test",
    }),
  };

  async run(): Promise<void> {
    this.parse(Test);
    const { flags } = this.parse(Test);
    const { "fail-fast": failFast, debug, grep, retries, timeout } = flags;
    const pathToApp = process.cwd();

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
  }
}
