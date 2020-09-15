import * as ApiKeyStore from "./core/utils/api-key-store";
import APIClient from "./core/api-client";
import fs from "fs";
import path from "path";
import { AppUser } from "./core/types";
import { Command as Base } from "@oclif/command";

interface PackageJSON {
  name: string;
  version: string;
}

const pjson = JSON.parse(fs.readFileSync(path.join(__dirname, "..", "package.json"), "utf8")) as PackageJSON;

export default abstract class BaseCommand extends Base {
  public base = `${pjson.name}@${pjson.version}`;

  public async apiClient(debug = false): Promise<APIClient> {
    const apiKey = await ApiKeyStore.get()
    return new APIClient(apiKey, debug);
  }

  /**
   * Get the current user logged into the CLI
   * @returns {Promise<AppUser>} A promise w/ the user object
   */
  public async getCurrentUser(debug = false): Promise<AppUser> {
    const apiKey = await ApiKeyStore.get()
    const apiClient = new APIClient(apiKey, debug);
    const user = await apiClient.user.getCurrent()

    return user;
  }
}
