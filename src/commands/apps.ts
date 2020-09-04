import BaseCommand from "../base-command";
import { flags } from "@oclif/command";
import Login from './login';
import Table from 'cli-table';

export default class Apps extends BaseCommand {
  public static description = "List your apps";

  public static flags = {
    help: flags.help({
      char: "h",
      description: "Show help for the apps commands",
    }),
  };

  async run(): Promise<void> {
    // When the -h flag is present the following line haults execution
    this.parse(Apps);

    // Verify user is logged in
    try {
      await this.getCurrentUser();
    } catch {
      await Login.run([])
    }

    const table = new Table({
      head: ['ID', 'Name', "Type"]
    });

    const apiClient = await this.apiClient()
    const apps = apiClient.apps.getAll();

    (await apps).items.forEach((app) => {
      table.push([app.id, app.name, app.type])
    });

    this.log(table.toString());
  }
}
