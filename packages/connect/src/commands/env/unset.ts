import { flags } from '@oclif/command';
import AppBaseCommand from '../../base-app-command';

export default class UnSet extends AppBaseCommand {
  static description = 'Unset (delete) environment variables from an app';

  static strict = false;

  static aliases = ['unset'];

  static flags = {
    ...AppBaseCommand.flags,
    help: flags.help({
      char: 'h',
      description: 'show help for the env command',
    }),
  };

  static args = [
    {
      name: 'NAME-1 ... NAME-N',
      description:
        'the environment variable name(s). e.g. FOO (note: name will always be UpperCased)',
      required: true,
    },
  ];

  async run(): Promise<void> {
    if (!(this.client && this.platformApp)) {
      this.error('Initialization failed - invalid state');
      return;
    }

    const names = this.argv.map((a) => a.toUpperCase());

    try {
      const configurationKeys = await this.client.configuration.list(
        this.platformApp.id,
      );
      if (
        configurationKeys.filter((key) => names.includes(key.name)).length === 0
      ) {
        this.warn(
          `none of ${names.join(
            ',',
          )} exist as an environment variable for this app.`,
        );
      }

      for (const name of names) {
        await this.client.configuration.unset(this.platformApp.id, name);
        this.log(`${name} has been removed as an environment variable.`);
      }
    } catch (error) {
      return this.error('Error unsetting the environment variable', {
        exit: 1,
      });
    }
  }
}
