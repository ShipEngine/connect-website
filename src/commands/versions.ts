import BaseCommand from "../base-command";
import getVersions from '../core/utils/get-versions';

export default class Versions extends BaseCommand {
  // hide the command from help
  public static hidden = true;

  async run(): Promise<void> {
    const versions = getVersions()
    let longestKeyVal = 0;

    Object.keys(versions).forEach((key: string) => {
      if (key.length > longestKeyVal) {
        longestKeyVal = key.length
      }
    });

    return Object.entries(versions).forEach(([key, value]: [string, string]) => this.log(`${key}${this.addPadding(longestKeyVal, key)} ${value}`))
  }

  private addPadding(longestKeyVal: number, currentKey: string) {
    const padding = longestKeyVal - currentKey.length;
    return " ".repeat(padding);
  }
}
