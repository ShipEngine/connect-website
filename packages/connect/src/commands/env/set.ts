import { flags } from '@oclif/command';
import AppBaseCommand from '../../base-app-command';
import {
  ConfigurationKey,
  EnvironmentType,
} from '../../core/types/configuration-key';
import { parseKeyValuePairs } from '../../core/utils/parse-key-value-pairs';

export default class Set extends AppBaseCommand {
  static description = 'Set environment variables for an app';

  static strict = false;

  static aliases = ['set'];

  static flags = {
    ...AppBaseCommand.flags,
    help: flags.help({
      char: 'h',
      description: 'show help for the env command',
    }),
  };

  static args = [
    {
      name: 'NAME-1=value ... NAME-N=value',
      description:
        'the environment variable(s) name=value. e.g. FOO=bar (note: name will always be UPPERCASED)',
      required: true,
    },
  ];

  async run(): Promise<void> {
    if (!(this.client && this.platformApp)) {
      this.error('Initialization failed - invalid state');
      return;
    }

    const configurationKeys: ConfigurationKey[] = parseKeyValuePairs(
      this.argv,
    ).map((kvp) => {
      return {
        name: kvp.key.toUpperCase(),
        value: kvp.value,
        environmentType: EnvironmentType.dev,
      };
    });

    for (const key of configurationKeys) {
      try {
        const configurationKey = await this.client.configuration.set(
          this.platformApp.id,
          key,
        );
        this.log(
          `${configurationKey.name}=${configurationKey.value} has been set.`,
        );
      } catch (error) {
        this.error('Error setting environment variable', {
          exit: 1,
        });
      }
    }
  }
}
