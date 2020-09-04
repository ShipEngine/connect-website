import BaseCommand from "../base-command";
import { flags } from "@oclif/command";
import { loadApp } from "@shipengine/connect-loader";
import Login from './login';
import { ApiClientErrors } from '../core/api-client'

export default class Info extends BaseCommand {
  public static description = "Get the logs for your app";

  static flags = {
    help: flags.help({
      char: "h",
      description: "Show help for the logs command",
    }),
  };

  async run(): Promise<void> {
    // When the -h flag is present the following line haults execution
    this.parse(Info);

    // Verify user is logged in
    try {
      await this.getCurrentUser();
    } catch {
      await Login.run([])
    }

    try {
      const pathToApp = process.cwd();
      const app = await loadApp(pathToApp);

      const apiClient = await this.apiClient()

      const platformApp = await apiClient.apps.getByName(app.manifest.name);
      const paginatedDeployments = await apiClient.deployments.getAllForAppId(
        platformApp.id,
      );
      const latestDeployment = paginatedDeployments.items[0];

      const logs = await apiClient.deployments.getLogsById({ deployId: latestDeployment.deployId, appId: platformApp.id })

      this.log(logs);

    } catch (error) {
      switch (error.code) {
        case "ERR_APP_ERROR":
          return this.error("Error loading your app - please make sure you are in an app directory", {
            exit: 1,
          });
        case ApiClientErrors.NotFound:
          return this.error("This app has not been published yet", {
            exit: 1,
          });
        default:
          return this.error("Error retrieving app info", {
            exit: 1,
          });
      }
    }
  }
}

