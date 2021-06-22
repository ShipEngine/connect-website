import * as ApiKeyStore from '../core/utils/api-key-store';
import BaseCommand from '../base-command';
import cli from 'cli-ux';
import { flags } from '@oclif/command';

export default class Logout extends BaseCommand {
  static description = 'Clears the local connect API key';

  static aliases = ['logout'];

  static flags = {
    help: flags.help({
      char: 'h',
      description: 'Show help for the auth:logout command',
    }),
  };

  async run(): Promise<void> {
    // When the -h flag is present the following line haults execution
    this.parse(Logout);

    cli.action.start('Logging out of connect');
    await ApiKeyStore.clear();
    cli.action.stop();
  }
}
