import { flags } from "@oclif/command";
import chalk from 'chalk';
import Table from 'cli-table';
import AppBaseCommand from "../../base-app-command";

export default class Get extends AppBaseCommand {
  static description = "Get environment variables for an app";

  static strict = false;

  static aliases = ['get'];

  static flags = {
    ...AppBaseCommand.flags,
    help: flags.help({
      char: "h",
      description: "show help for the env command",
    })
  };

  static args = [
    {
      name: "NAME-1 ... NAME-N",
      description: "the environment variable name(s). e.g. FOO (note: name will always be UPPERCASED)",
      required: true,
    }
  ]

  async run(): Promise<void> {

    if (!(this.client && this.platformApp)) {
      this.error("Initialization failed - invalid state");
      return;
    }

    const names = this.argv.map(a => a.toUpperCase());

    try {
      const configurationKeys = await this.client.configuration.list(this.platformApp.id);

      if (!(configurationKeys && configurationKeys.length > 0)) {
        this.log(`${this.platformApp.name} has no environment variables set`)
        return;
      }

      const table = new Table({
        head: [
          chalk.green('Name'),
          chalk.green("Value")
        ]
      });

      configurationKeys.filter(key => names.includes(key.name)).forEach(key => {
        table.push([key.name, key.value]);
      });

      if (table.length >= 1) {
        this.log(table.toString());
      } else {
        this.warn(`none of ${names.join(",")} exist`);
      }

    } catch (error) {
      return this.error("Error retrieving environment variables", {
        exit: 1,
      });
    }
  }
}
