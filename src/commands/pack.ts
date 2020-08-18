import BaseCommand from "../base-command";
import { flags } from "@oclif/command";
import { packageApp } from '../core/package-app';

export default class Publish extends BaseCommand {
  static description = "package your app";

  static examples = ["$ connect pack"];

  // TODO: come up with a convention for turning off spinners if the user desires
  // TODO: implement a quiet command?
  static flags = {
    help: flags.help({
      char: "h",
      description: "show help for the pack command",
    })
  };

  async run() {
    // When the -h flag is present the following line haults execution
    this.parse(Publish);

    try {
      
      await packageApp();

    } catch (error) {
      switch (error.code) {
        case "APP_FAILED_TO_PACKAGE":
          return this.error(error.message, {
            exit: 1,
          });
        default:
          throw error;
      }
    }
  }
} 
