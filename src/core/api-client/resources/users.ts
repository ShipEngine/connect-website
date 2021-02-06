import { AppUser } from "../../types";
import AppsAPIClient from '..';

export default class Users {
  private client: AppsAPIClient;

  constructor(apiClient: AppsAPIClient) {
    this.client = apiClient;
  }

  /**
   * Gets the current user for the given API key.
   * @returns {Promise<AppUser>} Promise that resolves to an AppUser.
   */
  async getCurrent(): Promise<AppUser> {
    const response = await this.client.call<AppUser>({
      endpoint: "diagnostics/whoami",
      method: "GET",
    });

    return response;
  }
}
