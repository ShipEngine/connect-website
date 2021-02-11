import BaseCommand from "../base-command";
import Login from './login';
import Test from "./test";
import publishApp, { isAppFailedToDeployError } from "../core/publish-app";
import { flags } from "@oclif/command";
import { packageApp, isAppFailedToPackageError } from '../core/package-app';

export default class Publish extends BaseCommand {
  static description = "Packages and publishes your app to the dev server";

  static examples = ["$ connect publish"];

  // TODO: come up with a convention for turning off spinners if the user desires
  // TODO: implement a quiet command?
  static flags = {
    help: flags.help({
      char: "h",
      description: "Show help for the publish command",
    }),
    "no-watch": flags.boolean({
      char: "n",
      description: "Does not track the status of the deployment",
    }),
    "skip-tests": flags.boolean({
      char: "s",
      description: "Skip running the test before publishing",
      default: false,
    }),
    debug: flags.boolean({
      char: "d",
      description: "Show network debugging information",
      default: false,
      hidden: true
    }),
  };

  async run(): Promise<void> {
    // When the -h flag is present the following line haults execution
    const { flags } = this.parse(Publish);

    // Verify user is logged in
    try {
      await this.getCurrentUser(flags.debug);
    } catch {
      await Login.run([])
    }

    const apiClient = await this.apiClient(flags.debug)

    // Run test in fail fast mode unless skipped
    if (!flags["skip-tests"]) await Test.run(["-f"]);

    try {
      const tarballName = await packageApp();

      await publishApp(tarballName, apiClient, {
        noWatch: flags["no-watch"],
      });
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
