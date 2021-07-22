import BaseCommand from '../base-command';
import { createEnv } from 'yeoman-environment';
import { flags } from '@oclif/command';
import cliBanner from '../core/utils/cli-banner';

const GENERATOR_TYPES = {
  APP: 'app',
  BETA: 'beta',
  INFRA: 'infra',
};

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
    const generatorOptions = {
      beta: flags.beta,
      force: flags.force,
      path: args.path,
      useDefaults: flags.yes,
    };

    env.register(
      require.resolve('../core/generators/apps-new'),
      GENERATOR_TYPES.APP,
    );
    env.register(
      require.resolve('../core/generators/beta-new'),
      GENERATOR_TYPES.BETA,
    );
    env.register(
      require.resolve('../core/generators/infra-new'),
      GENERATOR_TYPES.INFRA,
    );

    let generatorType = GENERATOR_TYPES.APP;
    if (flags.infra) {
      generatorType = GENERATOR_TYPES.INFRA;
    } else if (flags.beta) {
      generatorType = GENERATOR_TYPES.BETA;
    }

    this.log(cliBanner());
    this.log('Time to build a Connect app!');

    return await new Promise((resolve, reject) => {
      env.run(generatorType, generatorOptions, (err: Error | null) => {
        if (err) return reject(err);

        if (generatorType === GENERATOR_TYPES.BETA) {
          const infraOptions = {
            ...generatorOptions,
            type: (env as any).sharedOptions.integrationType,
            useDefaults: true,
          };
          env.run(GENERATOR_TYPES.INFRA, infraOptions, (err: Error | null) => {
            if (err) return reject(err);
            resolve();
          });
        } else {
          resolve();
        }
      });
    });
  }
}
