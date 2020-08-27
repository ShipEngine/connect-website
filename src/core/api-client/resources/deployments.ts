import * as fs from "fs";
import FormData from "form-data";
import ShipengineAPIClient from "..";
import {
  Deployment,
  NetworkErrorCollection,
  PaginatedItems,
} from "../../types";
import { AxiosError } from 'axios';

export default class Deployments {
  private client: ShipengineAPIClient;

  constructor(apiClient: ShipengineAPIClient) {
    this.client = apiClient;
  }

  /**
   * Create a new deployment for the given appID
   * @returns {Promise} Promise object that resolves to a Deployment object.
   */
  async create({
    appId,
    pathToTarball,
  }: {
    appId: string;
    pathToTarball: string;
  }): Promise<Deployment> {
    const form = new FormData();
    form.append("deployment", fs.createReadStream(pathToTarball));

    try {
      const response = await this.client.call({
        endpoint: `apps/${appId}/deploys`,
        method: "POST",
        body: form,
        headers: {
          "content-type": `multipart/form-data; boundary=${form.getBoundary()}`,
        },
        isFileUpload: true,
      }) as Deployment;

      return Promise.resolve(response);
    } catch (error) {
      const err = error as AxiosError;
      if (err.response) {
        return Promise.reject(err.response.data as NetworkErrorCollection);
      }
      return Promise.reject(err.message);    }
  }

  /**
   * Gets all deploys for the given appID
   * @returns {Promise} Promise object that resolves to an Array of Deployment objects.
   */
  async getAllForAppId(appId: string): Promise<PaginatedItems<Deployment>> {
    try {
      const response = await this.client.call({
        endpoint: `apps/${appId}/deploys`,
        method: "GET",
      }) as PaginatedItems<Deployment>;

      return Promise.resolve(response);
    } catch (error) {
      const err = error as AxiosError;
      if (err.response) {
        return Promise.reject(err.response.data as NetworkErrorCollection);
      }
      return Promise.reject(err.message);    }
  }

  /**
   * Gets the deploy for the given appId and deployID
   * @returns {Promise} Promise object that resolves to a Deployment object.
   */
  async getById({
    appId,
    deployId,
  }: {
    deployId: string;
    appId: string;
  }): Promise<Deployment> {
    try {
      const response = await this.client.call({
        endpoint: `apps/${appId}/deploys/${deployId}`,
        method: "GET",
      }) as Deployment;

      return Promise.resolve(response);
    } catch (error) {
      const err = error as AxiosError;
      if (err.response) {
        return Promise.reject(err.response.data as NetworkErrorCollection);
      }
      return Promise.reject(err.message);    }
  }

  /**
   * Gets the logs for a deployment for the given appId and deployID
   * @returns {Promise} Promise object that resolves to a Deployment object.
   */
  async getLogsById({
    appId,
    deployId,
  }: {
    deployId: string;
    appId: string;
  }): Promise<string> {
    try {
      const response = await this.client.call({
        endpoint: `apps/${appId}/deploys/${deployId}/logs`,
        method: "GET",
      }) as string;

      return Promise.resolve(response);
    } catch (error) {
      const err = error as AxiosError;
      if (err.response) {
        return Promise.reject(err.response.data as NetworkErrorCollection);
      }
      return Promise.reject(err.message);
    }
  }
}
