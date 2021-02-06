import Help, { HelpBase } from '@oclif/plugin-help';
import BaseCommand from "../base-command";

export default class Index extends BaseCommand {
  public static description = "Connect CLI";

  // hide the command from help
  public static hidden = true;

  async run(): Promise<void> {
    const help: HelpBase = new Help(this.config)

    help.showHelp([])
  }
}
