import ShipengineAPIClient from "..";
import { Pulse, NetworkErrorCollection } from "../../types";

export default class Diagnostics {
  private client: ShipengineAPIClient;

  constructor(apiClient: ShipengineAPIClient) {
    this.client = apiClient;
  }

  /**
   * Check the API for a heart beat.
   * @returns {Promise} Promise object that resolves to a Pulse object.
   */
  async heartBeat(): Promise<Pulse> {
    try {
      const response = await this.client.call({
        endpoint: "diagnostics/heartbeat",
        method: "GET",
      });

      return Promise.resolve(response);
    } catch (error) {
      return Promise.reject(error.response.data as NetworkErrorCollection);
    }
  }
}
