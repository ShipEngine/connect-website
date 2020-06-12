import { Command as Base } from "@oclif/command";
import ShipengineAPIClient from "./core/shipengine-api-client";
import { User } from "./core/types";
import * as ApiKeyStore from "./core/api-key-store";

const pjson = require("../package.json");

export default abstract class BaseCommand extends Base {
  base = `${pjson.name}@${pjson.version}`;
  private _client!: ShipengineAPIClient;

  get client(): ShipengineAPIClient {
    // if (this._client) return this._client;
    const apiKey = ApiKeyStore.get();

    if (!apiKey) {
      throw new Error("key not found");
    }

    this._client = new ShipengineAPIClient(apiKey);

    return this._client;
  }

  async currentUser(): Promise<User> {
    return (await this.client.users.getCurrent()) as User;
  }
}
