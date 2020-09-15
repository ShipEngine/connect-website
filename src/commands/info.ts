import BaseCommand from "../base-command";
import { flags } from "@oclif/command";
import { loadApp } from "@shipengine/connect-loader";
import Login from './login';
import { ApiClientErrors } from '../core/api-client'
import Table from 'cli-table';

export default class Info extends BaseCommand {
  public static description = "Get the current information about your app";

  static flags = {
    help: flags.help({
      char: "h",
      description: "Show help for the info command",
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
    const { flags } = this.parse(Info);

    // Verify user is logged in
    try {
      await this.getCurrentUser(flags.debug);
    } catch {
      await Login.run([])
    }

    try {
      const pathToApp = process.cwd();
      const app = await loadApp(pathToApp);

      const apiClient = await this.apiClient(flags.debug)

      const platformApp = await apiClient.apps.getByName(app.manifest.name);
      const paginatedDeployments = await apiClient.deployments.getAllForAppId(
        platformApp.id,
      );

      const latestDeployment = paginatedDeployments.items[0];

      const table = new Table({
        head: ['ID', 'Name', "Type", "Status", "Created At"]
      });

      table.push([platformApp.id, platformApp.name, platformApp.type, latestDeployment.status, latestDeployment.createdAt])
      this.log(table.toString());
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
