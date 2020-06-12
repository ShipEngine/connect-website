import BaseCommand from "../../base-command";
import { flags } from "@oclif/command";
import Login from "../auth/login";

export default class AppsIndex extends BaseCommand {
  static description = "list your apps";

  static flags = {
    help: flags.help({
      char: "h",
      description: "show help for the apps commands",
    }),
  };

  // hide the command from help
  static hidden = true;

  async run() {
    // When the -h flag is present the following line haults execution
    this.parse(AppsIndex);

    try {
      await this.currentUser();
    } catch {
      this.log("you need to login before you can list your apps");
      await Login.run([]);
    }

    try {
      const apps = this.client.apps.getAll();
      (await (await apps).items).forEach((app) => {
        this.log(app.name);
      });
    } catch (error) {
      this.error(error);
    }
  }
}
