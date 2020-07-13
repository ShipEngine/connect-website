import ShipengineAPIClient from "..";
import { Carrier, NetworkErrorCollection } from "../../types";

export default class Carriers {
  private client: ShipengineAPIClient;

  constructor(apiClient: ShipengineAPIClient) {
    this.client = apiClient;
  }

  /**
   * Gets the current user for the given API key.
   * @returns {Promise} Promise object that resolves to a User object.
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
