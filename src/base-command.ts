import { Command as Base } from "@oclif/command";
import AppsAPIClient from "./core/apps-api-client";
import { AppUser, ShipEngineUser } from "./core/types";
import * as ApiKeyStore from "./core/api-key-store";
import ShipEngineAPIClient from './core/shipengine-api-client';
import { Domain } from './core/api-key-store';

const pjson = require("../package.json");

export default abstract class BaseCommand extends Base {
  base = `${pjson.name}@${pjson.version}`;
  private _appsClient!: AppsAPIClient;
  private _shipengineClient!: ShipEngineAPIClient;

  get appsClient(): AppsAPIClient | undefined {
    const apiKey = ApiKeyStore.get(Domain.Apps);

    if (!apiKey) {
      return undefined;
    }

    this._appsClient = new AppsAPIClient(apiKey);

    return this._appsClient;
  }
  get shipengineClient(): ShipEngineAPIClient | undefined {
    const apiKey = ApiKeyStore.get(Domain.ShipEngine);

    if (!apiKey) {
      return undefined;
    }

    this._shipengineClient = new ShipEngineAPIClient(apiKey);

    return this._shipengineClient;
  }

  async currentAppUser(): Promise<AppUser> {
    try {
      return await this.appsClient!.user.getCurrent();
    }
    catch(error) {
      this.error(error.errors[0].message);
    }
  }

  async currentShipEngineUser(): Promise<ShipEngineUser> {
    try {
      return await this.shipengineClient!.user.getCurrent();
    }
    catch(error) {
      this.error(error.errors[0].message);
    }
  }
}
