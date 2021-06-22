import BaseCommand from '../base-command';
import { createEnv } from 'yeoman-environment';
import { flags } from '@oclif/command';
import cliBanner from '../core/utils/cli-banner';

export default class New extends BaseCommand {
  static description =
    'Create a new package to develop a custom ShipEngine app';

  static aliases = ['new'];

  static flags = {
    force: flags.boolean({
      description: 'Overwrite existing files',
      char: 'f',
    }),
    yes: flags.boolean({
      description:
        'Skips the questions and uses the defaults (carrier|Javascript|yaml)',
      char: 'y',
    }),
    help: flags.help({
      char: 'h',
      description: 'Show help for the new command',
    }),
    infra: flags.boolean({
      description:
        'Initializes infra files for ShipEngine internal deployments',
    }),
    beta: flags.boolean({
      description:
        'Create a new package to develop a ShipEngine connect app using the latest definitions.',
    }),
  };

  static args = [
    {
      name: 'path',
      required: false,
      description: 'Path to new package (defaults to current directory)',
    },
  ];

  static examples = ['$ connect init'];

  async run(): Promise<void> {
    const { flags, args } = this.parse(New);
    const env = createEnv();

    // If the infra flag is present, use the infra generator
    if (flags.infra) {
      env.register(require.resolve('../core/generators/infra-new'), 'new');

      const generatorOptions = {
        path: args.path,
      };

      await new Promise((resolve, reject) => {
        env.run('new', generatorOptions, (err: Error | null) => {
          if (err) reject(err);
          else resolve('done');
        });
      });

      return;
    }
    if (flags.beta) {
      env.register(require.resolve('../core/generators/beta-new'), 'new');
      const generatorOptions = {
        path: args.path,
        skipQuestions: flags.yes,
        force: flags.force,
      };

      this.log(cliBanner());
      this.log('Time to build a Connect app!');

      await new Promise((resolve, reject) => {
        env.run('new', generatorOptions, (err: Error | null) => {
          if (err) reject(err);
          else resolve('done');
        });
      });
      return;
    }

    env.register(require.resolve('../core/generators/apps-new'), 'new');

    const generatorOptions = {
      path: args.path,
      skipQuestions: flags.yes,
      force: flags.force,
    };

    this.log(cliBanner());
    this.log('Time to build a Connect app!');

    await new Promise((resolve, reject) => {
      env.run('new', generatorOptions, (err: Error | null) => {
        if (err) reject(err);
        else resolve('done');
      });
    });
  }
}
