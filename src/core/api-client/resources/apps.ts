import ShipengineAPIClient from "..";
import {
  ConnectApp,
  PaginatedItems,
  NetworkErrorCollection,
} from "../../types";
import { AxiosError } from 'axios';
import { Connect } from '@shipengine/connect-sdk';

export default class Apps {
  private client: ShipengineAPIClient;

  constructor(apiClient: ShipengineAPIClient) {
    this.client = apiClient;
  }

  /**
   * Creates a new App.
   * @returns {Promise} Promise object that resolves to a ConnectApp object.
   */
  async create({
    name,
    type,
  }: {
    name: string;
    type: "carrier";
  }): Promise<ConnectApp> {
    try {
      const response = await this.client.call({
        endpoint: "apps",
        method: "POST",
        body: { name, type },
      }) as ConnectApp;

      return Promise.resolve(response);
    } catch (error) {
      return Promise.reject(error.response.data as NetworkErrorCollection);
    }
  }

  /**
   * Finds or creates a new app by name
   * @returns {Promise} Promise object that resolves to a ConnectApp object.
   */
  async findOrCreateByName({
    name,
    type,
  }: {
    name: string;
    type: "carrier";
  }): Promise<ConnectApp> {
    let deployedApp;

    try {
      deployedApp = await this.getByName(name);
    } catch (error) {
      if (error.statusCode === 401) {
        return Promise.reject(error);
      }

      deployedApp = await this.create({
        name: name,
        type: type,
      });
    }

    return Promise.resolve(deployedApp);
  }

  /**
   * Gets all Apps that belong to the given API key.
   * @returns {Promise} Promise object that resolves to an Array of ConnectApp objects.
   */
  async getAll(): Promise<PaginatedItems<ConnectApp>> {
    try {
      const response = await this.client.call({
        endpoint: "apps",
        method: "GET",
      }) as PaginatedItems<ConnectApp>;

      return Promise.resolve(response);
    } catch (error) {
      return Promise.reject(error.response.data as NetworkErrorCollection);
    }
  }

  /**
   * Get an App by its ID.
   * @returns {Promise} Promise object that resolves to a ConnectApp object.
   */
  async getById(id: string): Promise<ConnectApp> {
    try {
      const response = await this.client.call({
        endpoint: `apps/${id}`,
        method: "GET",
      });

      return Promise.resolve(response);
    } catch (error) {
      return Promise.reject(error.response.data as NetworkErrorCollection);
    }
  }

  /**
   * Get an App by its name.
   * @returns {Promise} Promise object that resolves to a ConnectApp object.
   */
  async getByName(name: string): Promise<ConnectApp> {
    try {
      const response = await this.client.call({
        endpoint: `apps?name=${encodeURI(name)}`,
        method: "GET",
      });

      if (response.items[0]) {
        return Promise.resolve(response.items[0]);
      }
      
      return Promise.reject({ statusCode: 404 });
    } catch (error) {
      return Promise.reject(error.response.data as NetworkErrorCollection);
    }
  }
}
