import BaseCommand from "../base-command";
import testApp from "../core/test-app";
import { flags } from "@oclif/command";

export default class Test extends BaseCommand {
  static description = "Test your app definition";

  static examples = ["$ connect test"];

  static flags = {
    help: flags.help({
      char: "h",
      description: "Show help for the test command",
    }),
  };

  async run(): Promise<void> {
    this.parse(Test);
    const pathToApp = process.cwd();

    const results = await testApp(pathToApp);

    if (results.failed > 0) {
      return this.exit(1);
    }
  }
}
