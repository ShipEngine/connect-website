import { Command as Base } from "@oclif/command";

import APIClient from "./api-client";

const pjson = require("../package.json");

export default abstract class BaseCommand extends Base {
  base = `${pjson.name}@${pjson.version}`;
  private _client!: APIClient;

  get client(): APIClient {
    if (this._client) return this._client;

    // Potentiallly use this.config to add more metadata to API Client as features are developed
    this._client = new APIClient();
    return this._client;
  }
}
