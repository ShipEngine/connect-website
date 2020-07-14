import ShipengineAPIClient from "..";
import { ShipEngineUser, ShipEngineAPIErrorCollection } from "../../types";

export default class User {
  private client: ShipengineAPIClient;

  constructor(apiClient: ShipengineAPIClient) {
    this.client = apiClient;
  }

  /**
   * Gets the current user for the given API key.
   * @returns {Promise} Promise object that resolves to a User object.
   */
  async getCurrent(): Promise<ShipEngineUser> {
    try {
      const response = await this.client.call({
        endpoint: "v1/environment/whoami",
        method: "GET",
      });

      return Promise.resolve({
        username: response.data.username
      });
    } catch (error) {
      return Promise.reject(error.response.data as ShipEngineAPIErrorCollection);
    }
  }
}
