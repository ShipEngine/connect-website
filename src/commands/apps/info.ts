import BaseCommand from "../../base-command";
import { flags } from "@oclif/command";
import Login from "../auth/login";
import { loadApp } from "@shipengine/integration-platform-loader";

export default class Info extends BaseCommand {
  static description = "list info for an app";

  static flags = {
    help: flags.help({
      char: "h",
      description: "show help for the apps:info commands",
    }),
  };

  async run() {
    // When the -h flag is present the following line haults execution
    this.parse(Info);

    try {
      // TODO: Fix this for new multi-auth scheme
      await this.currentAppUser();
    } catch {
      this.log("you need to login before you can list your apps");
      await Login.run([]);
    }

    const pathToApp = process.cwd();
    const app = await loadApp(pathToApp);

    try {
      const platformApp = await this.appsClient.apps.getByName(app.manifest.name);
      const paginatedDeployments = await this.appsClient.deployments.getAllForAppId(
        platformApp.id,
      );

      this.log(
        `{
  name: ${platformApp.name},
  status: ${
    paginatedDeployments.items[0]
      ? paginatedDeployments.items[0].status
      : "none"
  }
}`,
      );
    } catch (error) {
      this.error(`error fetching info for ${app.manifest.name}`);
    }
  }
}
