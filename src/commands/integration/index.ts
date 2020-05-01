import {Command, flags} from "@oclif/command"

export default class IntegrationIndex extends Command {
  static description = "create a new project to develop a custom ShipEngine integration"

  static flags = {
    help: flags.help({char: "h"}),
  }

  static examples = [
    "integration:new",
  ]

  async run() {
    this._help();
  }
}
