import BaseCommand from "../base-command";
import { flags } from "@oclif/command";
import { loadApp } from "@shipengine/connect-loader";
import Login from './login';
import { ApiClientErrors } from '../core/api-client'
import Table from 'cli-table';
import { createOrFindTestAccounts } from '../core/utils/create-or-find-test-account';
import { displayAccountInfo, getSupportedCountries } from "../core/publish-app";
import { updateAppId } from "../core/update-app-id";
import path from "path";
import { yellow } from "chalk";

const displayAppInfo = (log: any, id: string, name: string, type: string, status: string, createdAt: string) => {
  const table = new Table();
  table.push(
    { 'ID': [id] },
    { 'Name': [name] },
    { 'Type': [type] },
    { 'Status': [status] },
    { 'Created At': [createdAt] },
  );
  log(table.toString());
}

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
      
      const supportedCountries = getSupportedCountries(app);

      const apiClient = await this.apiClient(flags.debug);

      const platformApp = await apiClient.apps.getByIdOrName(app.manifest.name, app.manifest.appId);
      if(!app.manifest.appId) {
        updateAppId(path.join(process.cwd(), 'package.json'), platformApp.id);
        app.manifest.appId = platformApp.id;
        console.log(yellow(`Updated package.json set appId to ${platformApp.id}`));
      }
      const paginatedDeployments = await apiClient.deployments.getAllForAppId(
        platformApp.id,
      );

      const latestDeployment = paginatedDeployments.items[0];

      const accounts = await createOrFindTestAccounts(apiClient, platformApp, supportedCountries);
      displayAppInfo(this.log, platformApp.id, platformApp.name, platformApp.type, latestDeployment.status, latestDeployment.createdAt);
      console.log('\nCredentials\n');
      displayAccountInfo(accounts);

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
