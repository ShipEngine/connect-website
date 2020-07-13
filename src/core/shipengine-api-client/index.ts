import axios, { Method, AxiosRequestConfig } from "axios";
import Diagnostics from "./resources/diagnostics";
import User from "./resources/user";
import Carriers from './resources/carriers';

export interface ApiClientParams {
  endpoint: string;
  method: Method;
  body?: object;
  headers?: object;
  isFileUpload?: boolean;
}

/**
 * Create an instance of the ShipEngineAPIClient.
 * @param {string} apiKey A valid API key.
 */
export default class ShipEngineAPIClient {
  diagnostics: Diagnostics;
  user: User;
  apiKey: string;
  carriers: Carriers;
  private _apiAuthority = "https://api.shipengine.com";

  constructor(apiKey: string) {
    this.apiKey = apiKey;

    this.diagnostics = new Diagnostics(this);
    this.user = new User(this);
    this.carriers = new Carriers(this);
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
