import BaseCommand from '../base-command';
import { flags } from '@oclif/command';
import { packageApp, isAppFailedToPackageError } from '../core/package-app';

export default class Publish extends BaseCommand {
  static description = 'Package your app';

  static examples = ['$ connect pack'];

  // TODO: come up with a convention for turning off spinners if the user desires
  // TODO: implement a quiet command?
  static flags = {
    help: flags.help({
      char: 'h',
      description: 'Show help for the pack command',
    }),
  };

  async run(): Promise<void> {
    // When the -h flag is present the following line haults execution
    this.parse(Publish);

    try {
      await packageApp();
    } catch (error) {
      if (isAppFailedToPackageError(error)) {
        return this.error(error.message, {
          exit: 1,
        });
      }
      throw error;
    }
  }
}
