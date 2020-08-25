import { Command as Base } from "@oclif/command";
import APIClient from "./core/api-client";
import { AppUser } from "./core/types";
import * as ApiKeyStore from "./core/api-key-store";
import { Domain } from "./core/api-key-store";
import fs from "fs";
import path from "path";

interface PackageJSON {
  name: string;
  version: string;
}

const pjson = JSON.parse(fs.readFileSync(path.join(__dirname, "..", "package.json"), "utf8")) as PackageJSON;

export default abstract class BaseCommand extends Base {
  public base = `${pjson.name}@${pjson.version}`;

  private _appsClient!: APIClient;

  public get appsClient(): APIClient | undefined {
    const apiKey = ApiKeyStore.get(Domain.Apps);

    if (!apiKey) {
      return undefined;
    }

    this._appsClient = new APIClient(apiKey);

    return this._appsClient;
  }

  public async currentUser(): Promise<AppUser> {
    try {
      return await this.appsClient!.user.getCurrent();
    }
    catch (error) {
      const err = error as Error;
      this.error(err.message);
    }
  }
}
