import axios, { Method, AxiosRequestConfig } from "axios";
import Apps from "./resources/apps";
import Deployments from "./resources/deployments";
import Diagnostics from "./resources/diagnostics";
import User from "./resources/user";

export interface ApiClientParams {
  endpoint: string;
  method: Method;
  body?: object;
  headers?: object;
  isFileUpload?: boolean;
}

/**
 * Create an instance of the IntegrationsAPIClient.
 * @param {string} apiKey A valid API key.
 */
export default class APIClient {
  apps: Apps;
  deployments: Deployments;
  diagnostics: Diagnostics;
  user: User;
  apiKey: string;
  private _apiAuthority = "https://dip-webapi-dev.kubedev.sslocal.com/api";

  constructor(apiKey: string) {
    this.apiKey = apiKey;

    this.apps = new Apps(this);
    this.deployments = new Deployments(this);
    this.diagnostics = new Diagnostics(this);
    this.user = new User(this);
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
