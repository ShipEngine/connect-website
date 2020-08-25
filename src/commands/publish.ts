import BaseCommand from "../base-command";
import Test from "./test";
import publishApp, { isAppFailedToDeployError } from "../core/publish-app";
import { flags } from "@oclif/command";
import { checkAppLoginStatus } from "../core/utils/users";
import { packageApp, isAppFailedToPackageError } from '../core/package-app';

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

  async run(): Promise<void> {
    // When the -h flag is present the following line haults execution
    const { flags } = this.parse(Publish);

    await checkAppLoginStatus(this);

    if (!flags["skip-tests"]) await Test.run(["-f"]);

    try {
      const tarballName = await packageApp();
      if(this.appsClient) {
        await publishApp(tarballName, this.appsClient, {
          noWatch: flags["no-watch"],
        });
      }
    } catch (error) {

      if (isAppFailedToPackageError(error)) {
        return this.error(error.message, {
          exit: 1,
        });
      }

      if (isAppFailedToDeployError(error)) {
        return this.error(error.message, {
          exit: 1,
        });
      }

      throw error;
    }
  }
}
