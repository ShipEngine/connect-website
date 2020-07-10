import BaseCommand from "../../base-command";
import Login from "../auth/login";
import Test from "./test";
import publishApp from "../../core/publish-app";
import { flags } from "@oclif/command";

export default class Publish extends BaseCommand {
  static description = "publish your app";

  static examples = ["$ shipengine apps:publish"];

  // TODO: come up with a convention for turning off spinners if the user desires
  // TODO: implement a quiet command?
  static flags = {
    help: flags.help({
      char: "h",
      description: "show help for the apps:publish command",
    }),
    watch: flags.boolean({
      char: "w",
      description: "check the status of the deployment until complete",
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

    try {
      await this.currentAppUser();
    } catch {
      this.log("you need to login before you can publish your app");
      await Login.run([]);
    }

    if (!flags["skip-tests"]) await Test.run(["-f"]);

    try {
      const pathToApp = process.cwd();
      await publishApp(pathToApp, this.appsClient, {
        watch: flags.watch,
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
