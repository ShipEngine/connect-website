import { Command as Base } from "@oclif/command";
import AppsAPIClient from "./core/apps-api-client";
import { AppUser } from "./core/types";
import * as ApiKeyStore from "./core/api-key-store";
import { Domain } from './core/api-key-store';

const pjson = require("../package.json");

export default abstract class BaseCommand extends Base {
  base = `${pjson.name}@${pjson.version}`;
  private _appsClient!: AppsAPIClient;

  get appsClient(): AppsAPIClient | undefined {
    const apiKey = ApiKeyStore.get(Domain.Apps);

    if (!apiKey) {
      return undefined;
    }

    this._appsClient = new AppsAPIClient(apiKey);

    return this._appsClient;
  }

  async currentUser(): Promise<AppUser> {
    try {
      return await this.appsClient!.user.getCurrent();
    }
    catch(error) {
      this.error(error.message);
    }
  }
}
