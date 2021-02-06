import ShipengineAPIClient from "..";
import {NetworkErrorCollection} from "../../types";
import {ConfigurationKey} from "../../types/configuration-key";

export default class Configuration {
  private client: ShipengineAPIClient;

  constructor(apiClient: ShipengineAPIClient) {
    this.client = apiClient;
  }

  async list(appId: string): Promise<ConfigurationKey[]> {
    try {
      const response = await this.client.call<ConfigurationKey[]>({
        endpoint: `apps/${appId}/configuration/keys`,
        method: "GET"
      });
      return response;
    } catch (error) {
      return Promise.reject(error.response.data as NetworkErrorCollection);
    }
  }

  async set(appId: string, configurationKey: ConfigurationKey): Promise<ConfigurationKey> {
    try {
      const response = await this.client.call<ConfigurationKey>({
        endpoint: `apps/${appId}/configuration/keys`,
        method: "PUT",
        body: configurationKey
      });
      return response;
    } catch (error) {
      return Promise.reject(error.response.data as NetworkErrorCollection);
    }
  }

  async unset(appId: string, name: string) {
    try {
      const response = await this.client.call<ConfigurationKey>({
        endpoint: `apps/${appId}/configuration/keys/${name}`,
        method: "DELETE",
      });
      return response;
    } catch (error) {
      return Promise.reject(error.response.data as NetworkErrorCollection);
    }
  }
}
