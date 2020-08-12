import BaseCommand from "../base-command";
import chalk from "chalk";
import { createEnv } from "yeoman-environment";
import { flags } from "@oclif/command";

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

  static examples = ["$ connect new"];

  async run() {
    const { flags, args } = this.parse(New);
    const env = createEnv();
    env.register(require.resolve("../core/generators/apps-new"), "new");

    const generatorOptions = {
      path: args.path,
      skipQuestions: flags.yes,
      force: flags.force,
    };

    this.log(this.banner());
    this.log("Time to build a ShipEngine app!");

    await new Promise((resolve, reject) => {
      env.run("new", generatorOptions, (err: Error | null) => {
        if (err) reject(err);
        else resolve("done");
      });
    });
  }

  private banner() {
    return chalk.blueBright(`
         .;i1:                      .iii,
        1GLtt;                      ,ttfGL.
       :8t             .,..             ;81
       ;8i         ,,  iiii. .,.        ,0t
       ;81       ,i1i;;iiii;;i1i:       ,8t
       :81       .;iii1iiii1iiii.       :8t
      .18i     .::;iii:.  .:iiii,,.     ,GL.
     .L8f      :111iii      ;iii11;      i0G,
      .10;     .,,;iii:.  .:iiii::,     ,GC,
       :81       .;iii1iiii1iii;.       :8f
       ;81       ,i1i;;iiii;;i1i:       :0f
       ;8i         ,.  ;1ii. .,.        ,0f
       :8t             .,,.             ;8f
        tGf11:                      ,t1fGL,
         .;i1:                      .1ii:
`);
  }
}
