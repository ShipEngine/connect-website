import { flags } from '@oclif/command';
import chalk from 'chalk';
import Table from 'cli-table';
import AppBaseCommand from '../../base-app-command';

export default class List extends AppBaseCommand {
  static description = 'List environment variables for an app';

  static flags = {
    ...AppBaseCommand.flags,
    help: flags.help({
      char: 'h',
      description: 'show help for the env command',
    }),
    format: flags.string({
      char: 'f',
      description: 'specify output format',
      default: 'table',
      options: ['table', 'dotenv'],
      parse: (input) => input.toLowerCase(),
    }),
  };

  async run(): Promise<void> {
    if (!(this.client && this.platformApp)) {
      this.error('Initialization failed - invalid state');
      return;
    }

    try {
      const configurationKeys = await this.client.configuration.list(
        this.platformApp.id,
      );

      if (!(configurationKeys && configurationKeys.length > 0)) {
        this.log(`${this.platformApp.name} has no environment variables set`);
        return;
      }

      const { flags } = this.parse(List);
      if (flags.format === 'table') {
        const table = new Table({
          head: [chalk.green('Name'), chalk.green('Value')],
        });
        configurationKeys.forEach((key) => {
          table.push([key.name, key.value]);
        });
        this.log(table.toString());
      } else if (flags.format === 'dotenv') {
        configurationKeys.forEach((key) => {
          this.log(`${key.name}=${key.value}`);
        });
      }
    } catch (error) {
      return this.error('Error retrieving environment variables', {
        exit: 1,
      });
    }
  }
}
