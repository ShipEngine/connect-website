import BaseCommand from "../../base-command";
import { flags } from "@oclif/command";
import { checkAppLoginStatus } from "../../core/utils/users";

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

    await checkAppLoginStatus(this);

    try {
      const apps = this.appsClient!.apps.getAll();
      (await (await apps).items).forEach((app) => {
        this.log(app.name);
      });
    } catch (error) {
      this.error(error);
    }
  }
}
