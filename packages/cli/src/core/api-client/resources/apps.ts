import ono from '@jsdevtools/ono';
import ShipengineAPIClient, { ApiClientErrors } from "..";
import { ConnectApp, PaginatedItems } from "../../types";
import { AppType } from '@shipengine/connect-sdk'

export default class Apps {
  private client: ShipengineAPIClient;

  constructor(apiClient: ShipengineAPIClient) {
    this.client = apiClient;
  }

  /**
   * Creates a new App.
   * @returns {Promise<ConnectApp>} Promise object that resolves to a ConnectApp object.
   */
  async create({
    appId,
    name,
    type,
  }: {
    appId?: string;
    name: string;
    type: AppType;
  }): Promise<ConnectApp> {
    const response = await this.client.call<ConnectApp>({
      endpoint: "apps",
      method: "POST",
      body: { appId, name, type },
    });

    return response;
  }

  /**
   * Finds or creates a new app by name
   * @returns {Promise<ConnectApp>} Promise object that resolves to a ConnectApp object.
   */
  async findOrCreateByName({
    appId,
    name,
    type,
  }: {
    appId?: string;
    name: string;
    type: AppType;
  }): Promise<ConnectApp> {
    let app;

    try {
      app = await this.getByName(name);
      return app;
    } catch (error) {
      const code = Reflect.get(error, "code") as string | undefined;

      if (code === ApiClientErrors.NotFound) {
        app = await this.create({
          appId: appId,
          name: name,
          type: type,
        });
        return app;
      }
      throw error;
    }
  }

  /**
   * Gets all Apps that belong to the given API key.
   * @returns {Promise<PaginatedItems<ConnectApp>>} Promise object that resolves to an Array of ConnectApp objects.
   */
  async getAll(): Promise<PaginatedItems<ConnectApp>> {
    const response = await this.client.call<PaginatedItems<ConnectApp>>({
      endpoint: "apps",
      method: "GET",
    });

    return response;
  }

  /**
   * Get an App by its ID.
   * @returns {Promise<ConnectApp>} Promise object that resolves to a ConnectApp object.
   */
  async getById(id: string): Promise<ConnectApp> {
    const response = await this.client.call<ConnectApp>({
      endpoint: `apps/${id}`,
      method: "GET",
    });

    return response;
  }

  /**
   * Get an App by its name.
   * @returns {Promise<ConnectApp>} Promise object that resolves to a ConnectApp object.
   */
  async getByName(name: string): Promise<ConnectApp> {
    const response = await this.client.call<PaginatedItems<ConnectApp>>({
      endpoint: `apps?name=${encodeURI(name)}`,
      method: "GET",
    });

    if (response.items[0]) {
      return response.items[0];
    }

    throw ono({ code: ApiClientErrors.NotFound }, "The record could not be found");
  }
}
