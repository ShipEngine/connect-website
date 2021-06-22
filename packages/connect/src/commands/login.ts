import BaseCommand from '../base-command';
import { flags } from '@oclif/command';
import cli from 'cli-ux';
import * as ApiKeyStore from '../core/utils/api-key-store';
import { ApiClientErrors, ApiClientError } from '../core/api-client';

export default class Login extends BaseCommand {
  static description = 'Login with your connect API key';

  static aliases = ['login'];

  static flags = {
    help: flags.help({
      char: 'h',
      description: 'Show help for the login command',
    }),
    debug: flags.boolean({
      char: 'd',
      description: 'Show network debugging information',
      default: false,
      hidden: true,
    }),
  };

  async run(): Promise<void> {
    // When the -h flag is present the following line haults execution
    const { flags } = this.parse(Login);

    const apiKey = (await cli.prompt('Please enter your API key', {
      type: 'mask',
    })) as string;

    await ApiKeyStore.set(apiKey);

    try {
      cli.action.start('Verifying account');
      await this.getCurrentUser(flags.debug);
    } catch (error) {
      await ApiKeyStore.clear();
      const err = error as ApiClientError;

      switch (err.code) {
        case ApiClientErrors.UnhandledError:
          return this.error(err.message, {
            exit: 1,
          });
        case ApiClientErrors.Unauthorized:
          return this.error('The given API key is not valid', {
            exit: 1,
          });
        default:
          return this.error(error, {
            exit: 1,
          });
      }
    } finally {
      cli.action.stop();
    }

    this.log('You have logged in with a Connect API key');
  }
}
