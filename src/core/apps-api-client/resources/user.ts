import { AppUser, NetworkErrorCollection } from "../../types";
import AppsAPIClient from '..';

export default class User {
  private client: AppsAPIClient;

  constructor(apiClient: AppsAPIClient) {
    this.client = apiClient;
  }

  /**
   * Gets the current user for the given API key.
   * @returns {Promise} Promise object that resolves to a User object.
   */
  async getCurrent(): Promise<AppUser | null > {
    try {
      const response = await this.client.call({
        endpoint: "diagnostics/whoami",
        method: "GET",
      });

      return response;
    } catch (error) {

      if (error.response.status === 401) {
        return null;
      }
      return Promise.reject(error.response.data as NetworkErrorCollection);
    }
  }
}
