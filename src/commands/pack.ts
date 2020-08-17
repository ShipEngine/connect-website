import BaseCommand from "../base-command";
import Test from "./test";
import { flags } from "@oclif/command";
import { checkAppLoginStatus } from "../core/utils/users";
import { packageApp } from '../core/package-app';

export default class Publish extends BaseCommand {
  static description = "package your app";

  static examples = ["$ connect pack"];

  // TODO: come up with a convention for turning off spinners if the user desires
  // TODO: implement a quiet command?
  static flags = {
    help: flags.help({
      char: "h",
      description: "show help for the pack command",
    }),
    "skip-tests": flags.boolean({
      char: "s",
      description: "skip running the test before packing",
      default: false,
    })
  };

  async run() {
    // When the -h flag is present the following line haults execution
    const { flags } = this.parse(Publish);

    await checkAppLoginStatus(this);

    if (!flags["skip-tests"]) await Test.run(["-f"]);

    try {

      // TODO: remove path to app?
      const pathToApp = process.cwd();
      
      await packageApp(pathToApp);

    } catch (error) {
      switch (error.code) {
        case "APP_FAILED_TO_PACKAGE":
          return this.error(error.message, {
            exit: 1,
          });
        default:
          throw error;
      }
    }
  }
}
