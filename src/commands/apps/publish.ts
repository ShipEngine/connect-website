import BaseCommand from "../../base-command";
import { packageApp } from "../../shipengine-core/publish/package-app";
import { deployApp } from "../../shipengine-core/publish/deploy-app";
import cli from "cli-ux";
import logSymbols from "log-symbols";
import { flags } from '@oclif/command';
import fs from "fs";
import path from "path";
import { checkDeploymentStatus } from '../../shipengine-core/publish/check-deployment-status';
import { DeploymentStatus } from '../../shipengine-core/utils/types';

/**
 * This command is meant to be used from the root of an integration platform app. 
 * It is response for:
 *  - Checking that the user is logged in.
 *  - bundling package.json dependencies
 *  - packaging the app into a tarball
 *  - sending that tarball to the integration platform for deployment
 *  - If desired, the user can set the --watch flag to poll the integration platfor for the status of the deployment
 */
export default class Publish extends BaseCommand {
  static description = "publish your app";
  
  static examples = ["$ shipengine apps:publish"];
  
  static flags = {
    help: flags.help({ char: "h", description: "show help for the apps:publish command" }),
    watch: flags.boolean({ char: "w", description: "check the status of the deployment until complete" })
    // TODO: come up with a convention for turning off spinners if the user desires
    // TODO: implement a quiet command?
  }

  // hide the command from help
  static hidden = true;

  async run() {

    const { flags } = this.parse(Publish);

    // Check that user is logged in, make them enter a valid api key to continue with their app publish.
    const apiClient = this.client;

    if (!apiClient.isLoggedIn) {
      let success = false;
      while(!success) {
         success = await apiClient.login();
      }
    }

    // TODO: Run test harness here once it's done.

    // Make a backup copy of the package.json file since we are going to add the bundledDependencies attribute
    const pJsonBackup = await fs.promises.readFile(path.join(process.cwd(), "package.json"));

    cli.action.start("Packaging App");
    let tarballName;
    try {
      tarballName = await packageApp();
    }
    catch (error) {
      let err = error as Error;
      const errorMessage = `Unable to bundle dependencies and package app: ${err.message}`;
      this.error(errorMessage);
    }
    finally {
      // Restore the package.json backup
      await fs.promises.writeFile(path.join(process.cwd(), "package.json"), pJsonBackup);
    }

    cli.action.stop(`${logSymbols.success}`);

    cli.action.start("Publishing App");

    let deploymentID;
    let appName;
    try {
      [deploymentID, appName] = await deployApp(tarballName, apiClient);
    }
    catch (error) {
      let err = error as Error;
      const errorMessage = `There was an error deploying your app to the integration platform: ${err.message}`;
      this.error(errorMessage);
    }
    finally {
      // Delete the package tarball
      await fs.promises.unlink(tarballName);
    }
    cli.action.stop(`${logSymbols.success}`);

    if (flags.watch) {
      cli.action.start("Checking on the App publish status");
      let status = await checkDeploymentStatus(appName, deploymentID, apiClient);

      if (status === DeploymentStatus.Error) {
        cli.action.stop(`${logSymbols.error} Your app encountered an error`);
      }
      else if (status === DeploymentStatus.Terminated) {
        cli.action.stop(`${logSymbols.error} Your app was terminated`);
      }
      else {
        cli.action.stop(`${logSymbols.success} Your app was published successfully`);
      }
    }
  }
}
