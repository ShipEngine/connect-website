import ShipengineAPIClient from "..";
import { User, NetworkErrorCollection } from "../../types";

export default class Users {
  private client: ShipengineAPIClient;

  constructor(apiClient: ShipengineAPIClient) {
    this.client = apiClient;
  }

  /**
   * Gets the current user for the given API key.
   * @returns {Promise} Promise object that resolves to a User object.
   */
  async getCurrent(): Promise<User> {
    try {
      const response = await this.client.call({
        endpoint: "diagnostics/whoami",
        method: "GET",
      });

      return Promise.resolve(response);
    } catch (error) {
      return Promise.reject(error.response.data as NetworkErrorCollection);
    }
  }
}
