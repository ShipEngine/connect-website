import { AppUser, NetworkErrorCollection } from "../../types";
import AppsAPIClient from '..';
import { AxiosError } from 'axios';

export default class User {
  private client: AppsAPIClient;

  constructor(apiClient: AppsAPIClient) {
    this.client = apiClient;
  }

  /**
   * Gets the current user for the given API key.
   * @returns {Promise} Promise object that resolves to a User object.
   */
  async getCurrent(): Promise<AppUser> {
    try {
      const response = await this.client.call({
        endpoint: "diagnostics/whoami",
        method: "GET",
      }) as AppUser;

      return response;
    } catch (error) {
      const err = error as AxiosError;
      if (err.response) {
        return Promise.reject(err.response.data as NetworkErrorCollection);
      }
      return Promise.reject(err.message);
    }
  }
}
