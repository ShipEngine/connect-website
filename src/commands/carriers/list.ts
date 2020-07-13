import BaseCommand from "../../base-command";
import { flags } from "@oclif/command";
import { checkShipEngineLoginStatus } from '../../core/utils/users';

export default class List extends BaseCommand {
  static description = "list the carriers associated with your account";

  static aliases = ["list"];

  static flags = {
    help: flags.help({
      char: "h",
      description: "show help for the carriers:list command",
    }),
  };

  async run() {
    // When the -h flag is present the following line haults execution
    this.parse(List);

    await checkShipEngineLoginStatus(this);

    const carriers = await this.shipengineClient!.carriers.getCarriers();

    this.log(`${JSON.stringify(carriers, undefined, 2)}`);
  }
}
