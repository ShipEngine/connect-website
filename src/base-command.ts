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
    // const iAPIKey = "app_9fY2bvveoWCaSTJo4cvYBj";
    // ApiKeyStore.set(Domain.Apps, iAPIKey);
    const apiKey = ApiKeyStore.get(Domain.Apps);

    if (!apiKey) {
      return undefined;
    }

    this._appsClient = new AppsAPIClient(apiKey);

    return this._appsClient;
  }
  get shipengineClient(): ShipEngineAPIClient | undefined {
    // const seAPIKey = "TEST_xIsWxsRSq8DRlqpR8Q6Hv0inBczK7vxIbyEAUeBRB5E";
    // ApiKeyStore.set(Domain.ShipEngine, seAPIKey);
    const apiKey = ApiKeyStore.get(Domain.ShipEngine);

    if (!apiKey) {
      return undefined;
    }

    this._shipengineClient = new ShipEngineAPIClient(apiKey);

    return this._shipengineClient;
  }

  async currentAppUser(): Promise<AppUser> {
    return await this.appsClient!.user.getCurrent();
  }

  async currentShipEngineUser(): Promise<ShipEngineUser> {
    return await this.shipengineClient!.user.getCurrent();
  }
}
