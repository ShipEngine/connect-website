import BaseCommand from "../../base-command";
import Login from "../auth/login";
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
  };

  async run() {
    // When the -h flag is present the following line haults execution
    // const { flags } = this.parse(Publish);
    this.parse(Publish);

    try {
      await this.currentUser();
    } catch {
      this.log("you need to login before you can publish your app");
      await Login.run([]);
    }

    try {
      const pathToApp = process.cwd();
      await publishApp(pathToApp, this.client);
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

    // if (flags.watch) {
    //   cli.action.start("Checking on the App publish status");
    //   let status = await checkDeploymentStatus(
    //     appName,
    //     deploymentID,
    //     apiClient,
    //   );

    //   if (status === DeploymentStatus.Error) {
    //     cli.action.stop(`${logSymbols.error} Your app encountered an error`);
    //   } else if (status === DeploymentStatus.Terminated) {
    //     cli.action.stop(`${logSymbols.error} Your app was terminated`);
    //   } else {
    //     cli.action.stop(
    //       `${logSymbols.success} Your app was published successfully`,
    //     );
    //   }
    // }
  }
}
