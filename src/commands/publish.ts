import BaseCommand from "../base-command";
import Test from "./test";
import publishApp from "../core/publish-app";
import { flags } from "@oclif/command";
import { checkAppLoginStatus } from "../core/utils/users";
import { packageApp } from '../core/package-app';

export default class Publish extends BaseCommand {
  static description = "publish your app";

  static examples = ["$ connect publish"];

  // TODO: come up with a convention for turning off spinners if the user desires
  // TODO: implement a quiet command?
  static flags = {
    help: flags.help({
      char: "h",
      description: "show help for the publish command",
    }),
    "no-watch": flags.boolean({
      char: "n",
      description: "does not track the status of the deployment",
    }),
    "skip-tests": flags.boolean({
      char: "s",
      description: "skip running the test before publishing",
      default: false,
    }),
  };

  async run() {
    // When the -h flag is present the following line haults execution
    const { flags } = this.parse(Publish);

    await checkAppLoginStatus(this);

    if (!flags["skip-tests"]) await Test.run(["-f"]);

    try {
      const pathToApp = process.cwd();
      
      const tarballName = await packageApp(pathToApp);
      await publishApp(tarballName, this.appsClient!, {
        noWatch: flags["no-watch"],
      });
    } catch (error) {
      switch (error.code) {
        case "APP_FAILED_TO_PACKAGE":
          return this.error(error.message, {
            exit: 1,
          });
        case "APP_FAILED_TO_DEPLOY":
          return this.error(error.message, {
            exit: 1,
          });
        default:
          throw error;
      }
    }
  }
}
