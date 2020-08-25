import BaseCommand from "../base-command";
import { flags } from "@oclif/command";
import startApp from "../core/start-app";

export default class Start extends BaseCommand {
  static description =
    "start a local web server to develop your app interactively";

  static flags = {
    help: flags.help({
      char: "h",
      description: "show help for the apps:start commands",
    }),
    port: flags.integer({
      description: "the port that the app will run on",
      char: "p",
      default: 3000,
    }),
  };

  async run(): Promise<void> {
    const { flags } = this.parse(Start);
    const { port } = flags;

    const cwd = process.cwd();

    startApp({ cwd, port });
  }
}
