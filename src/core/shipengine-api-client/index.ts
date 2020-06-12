import axios, { Method, AxiosRequestConfig } from "axios";
import Apps from "./resources/apps";
import Deploys from "./resources/deployments";
import Diagnostics from "./resources/diagnostics";
import Users from "./resources/users";

export interface ApiClientParams {
  endpoint: string;
  method: Method;
  body?: object;
  headers?: object;
  isFileUpload?: boolean;
}

/**
 * Create an instance of the ShipengineAPIClient.
 * @param {string} apiKey A valid API key.
 */
export default class ShipengineAPIClient {
  apps: Apps;
  deploys: Deploys;
  diagnostics: Diagnostics;
  users: Users;
  apiKey: string;
  private _apiAuthority = "https://dip-webapi-dev.kubedev.sslocal.com/api";

  constructor(apiKey: string) {
    this.apiKey = apiKey;

    this.apps = new Apps(this);
    this.deploys = new Deploys(this);
    this.diagnostics = new Diagnostics(this);
    this.users = new Users(this);
  }

  async call({
    endpoint,
    method,
    body = {},
    headers = {},
    isFileUpload = false,
  }: ApiClientParams): Promise<any> {
    const defaultHeaders = {
      "content-type": "application/json",
      "api-key": this.apiKey,
    };

    const mergedHeaders = {
      ...defaultHeaders,
      ...headers,
    };

    const request: AxiosRequestConfig = {
      headers: mergedHeaders,
      method: method as Method,
      url: `${this._apiAuthority}/${endpoint}`,
      ...(isFileUpload && { maxContentLength: Infinity }),
    };

    if (body) request.data = body;

    try {
      const response = await axios(request);
      return Promise.resolve(response.data);
    } catch (error) {
      return Promise.reject(error);
    }
  }
}
