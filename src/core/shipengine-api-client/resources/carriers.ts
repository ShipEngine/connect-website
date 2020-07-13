import ShipengineAPIClient from "..";
import { Carrier, NetworkErrorCollection } from "../../types";

/**
 * Handles all ShipEngine API interactions with the carrier resource
 */
export default class Carriers {
  private client: ShipengineAPIClient;

  constructor(apiClient: ShipengineAPIClient) {
    this.client = apiClient;
  }

  /**
   * Gets a list of carriers associated with the current ShipEngine user
   */
  async getCarriers(): Promise<Carrier[]> {
    try {
      const response = await this.client.call({
        endpoint: "v1/carriers",
        method: "GET",
      });

      const carrierList = [];
      for (let carrier of response.carriers) {
        let {carrier_id, carrier_code, friendly_name} = carrier;
        carrierList.push({friendly_name, carrier_id, carrier_code});
      }

      return Promise.resolve(carrierList);
    } catch (error) {
      return Promise.reject(error.response.data as NetworkErrorCollection);
    }
  }
}
