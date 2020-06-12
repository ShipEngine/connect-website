import * as fs from "fs";
import FormData from "form-data";
import ShipengineAPIClient from "..";
import { NewDeployment, Deployment, NetworkErrorCollection } from "../../types";

export default class Deploys {
  private client: ShipengineAPIClient;

  constructor(apiClient: ShipengineAPIClient) {
    this.client = apiClient;
  }

  /**
   * Create a new deployment for the given appID
   * @returns {Promise} Promise object that resolves to a NewDeployment object.
   */
  async create({
    appId,
    pathToTarball,
  }: {
    appId: string;
    pathToTarball: string;
  }): Promise<NewDeployment> {
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
      });

      return Promise.resolve(response);
    } catch (error) {
      return Promise.reject(error.response.data as NetworkErrorCollection);
    }
  }

  /**
   * Gets all deploys for the given appID
   * @returns {Promise} Promise object that resolves to an Array of Deployment objects.
   */
  async getAllForAppId(appId: string): Promise<Deployment[]> {
    try {
      const response = await this.client.call({
        endpoint: `apps/${appId}/deploys`,
        method: "GET",
      });

      return Promise.resolve(response);
    } catch (error) {
      return Promise.reject(error.response.data as NetworkErrorCollection);
    }
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
      });

      return Promise.resolve(response);
    } catch (error) {
      return Promise.reject(error.response.data as NetworkErrorCollection);
    }
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
      });

      return Promise.resolve(response);
    } catch (error) {
      return Promise.reject(error.response.data as NetworkErrorCollection);
    }
  }
}
