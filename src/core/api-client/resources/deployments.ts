import * as fs from "fs";
import FormData from "form-data";
import ShipengineAPIClient from "..";
import { Deployment, PaginatedItems } from "../../types";

export default class Deployments {
  private client: ShipengineAPIClient;

  constructor(apiClient: ShipengineAPIClient) {
    this.client = apiClient;
  }

  /**
   * Create a new deployment for the given appID
   * @returns {Promise<Deployment>} Promise object that resolves to a Deployment object.
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

    const response = await this.client.call<Deployment>({
      endpoint: `apps/${appId}/deploys`,
      method: "POST",
      body: form,
      headers: {
        "content-type": `multipart/form-data; boundary=${form.getBoundary()}`,
      },
      isFileUpload: true,
    });

    return response;
  }

  /**
   * Gets all deploys for the given appID
   * @returns {Promise<PaginatedItems<Deployment>>} Promise object that resolves to an Array of Deployment objects.
   */
  async getAllForAppId(appId: string): Promise<PaginatedItems<Deployment>> {
    const response = await this.client.call<PaginatedItems<Deployment>>({
      endpoint: `apps/${appId}/deploys`,
      method: "GET",
    });

    return response;
  }

  /**
   * Gets the deploy for the given appId and deployID
   * @returns {Promise<Deployment>} Promise object that resolves to a Deployment object.
   */
  async getById({
    appId,
    deployId,
  }: {
    deployId: string;
    appId: string;
  }): Promise<Deployment> {
    const response = await this.client.call<Deployment>({
      endpoint: `apps/${appId}/deploys/${deployId}`,
      method: "GET",
    });

    return response;
  }

  /**
   * Gets the logs for a deployment for the given appId and deployID
   * @returns {Promise<string>} Promise object that resolves to a Deployment object.
   */
  async getLogsById({
    appId,
    deployId,
  }: {
    deployId: string;
    appId: string;
  }): Promise<string> {
    const response = await this.client.call<string>({
      endpoint: `apps/${appId}/deploys/${deployId}/logs`,
      method: "GET",
    });

    return response;
  }
}
