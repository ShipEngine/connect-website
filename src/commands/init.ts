import BaseCommand from "../base-command";
import chalk from "chalk";
import { createEnv } from "yeoman-environment";
import { flags } from "@oclif/command";
import cliBanner from '../core/utils/cli-banner';

export default class New extends BaseCommand {
  static description =
    "create a new package to develop a custom ShipEngine app";

  static aliases = ["new"];

  static flags = {
    force: flags.boolean({
      description: "overwrite existing files",
      char: "f",
    }),
    yes: flags.boolean({
      description:
        "skips the questions and uses the defaults (carrier|Javascript|yaml)",
      char: "y",
    }),
    help: flags.help({
      char: "h",
      description: "show help for the new command",
    }),
  };

  static args = [
    {
      name: "path",
      required: false,
      description: "path to new package (defaults to current directory)",
    },
  ];

  static examples = ["$ connect init"];

  async run(): Promise<void> {
    const { flags, args } = this.parse(New);
    const env = createEnv();
    env.register(require.resolve("../core/generators/apps-new"), "new");

    const generatorOptions = {
      path: args.path,
      skipQuestions: flags.yes,
      force: flags.force,
    };

    this.log(cliBanner());
    this.log("Time to build a ShipEngine app!");

    await new Promise((resolve, reject) => {
      env.run("new", generatorOptions, (err: Error | null) => {
        if (err) reject(err);
        else resolve("done");
      });
    });
  }
}
