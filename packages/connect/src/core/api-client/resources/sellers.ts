import { Seller } from "../../types";
import AppsAPIClient from '..';

export default class Sellers {
  private client: AppsAPIClient;

  constructor(apiClient: AppsAPIClient) {
    this.client = apiClient;
  }

  /**
   * Gets the sellers for an application scoped to the given API key.
   * @returns {Promise<Seller[]>} Promise that resolves to an Seller.
   */
  async getSellersForAppId(appId: string): Promise<Seller[]> {
    const response = await this.client.call<Seller[]>({
      endpoint: `apps/${appId}/sellers`,
      method: "GET",
    });

    return response;
  }

  /**
   * Creates a seller for an application scoped to the given API key.
   * @returns {Promise<Seller>} Promise that resolves to an Seller.
   */
  async createSeller(appId: string, email: string, password: string, country: string): Promise<Seller> {
    const response = await this.client.call<Seller>({
      endpoint: `apps/${appId}/sellers`,
      method: "POST",
      body: {
        "email": email,
        "password": password,
        "firstName": "Test",
        "lastName": "User",
        "countryCode": country,
        "type": "shipstation"
      }
    });

    return response;
  }
}
