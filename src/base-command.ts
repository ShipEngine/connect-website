import { Command as Base } from "@oclif/command";

import APIClient from "./api-client";

const pjson = require("../package.json");

export default abstract class BaseCommand extends Base {
  base = `${pjson.name}@${pjson.version}`;
  _client!: APIClient;

  // get client(): client {
  //   if (this._client) return this._client;
  //   this._client = new APIClient(this.config);
  //   return this._client;
  // }
}
