import BaseCommand from "../base-command";
import { flags } from "@oclif/command";
import { loadApp } from "@shipengine/connect-loader";
import Login from './login';
import { ApiClientErrors } from '../core/api-client'
import { parseDIPLogs } from '../core/utils/dip-log-helpers';

export default class Logs extends BaseCommand {
  public static description = "Get the logs for your app";

  static flags = {
    help: flags.help({
      char: "h",
      description: "Show help for the logs command",
    }),
    debug: flags.boolean({
      char: "d",
      description: "Show network debugging information",
      default: false,
      hidden: true
    }),
    lines: flags.string({
      char: "l",
      default: "500",
      description: "The number of lines of logs to show from the server, max of 1500"
    }),
    all: flags.boolean({
      char: "a",
      default: false,
      description: "Show internal logs along with the app developer related ones"
    }),
    format: flags.string({
      char: "f",
      description: "The format the logs get shown in",
      options: ["default", "raw"],
      default: "default"
    })
  };

  async run(): Promise<void> {
    // When the -h flag is present the following line haults execution
    const { flags } = this.parse(Logs);

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

      const platformApp = await apiClient.apps.getByIdOrName(app.manifest.name, app.manifest.appId);
      const paginatedDeployments = await apiClient.deployments.getAllForAppId(
        platformApp.id,
      );
      const latestDeployment = paginatedDeployments.items[0];

      const logs = await apiClient.deployments.getLogsById({ deployId: latestDeployment.deployId, appId: platformApp.id })

      if (flags.format !== "raw") {
        const parsedLogs = parseDIPLogs(logs, Number(flags.lines), flags.all);
        parsedLogs.map(log => this.log(log));
      }
      else {
        this.log(logs);
      }

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
          return this.error(error, {
            exit: 1,
          });
      }
    }
  }
}
