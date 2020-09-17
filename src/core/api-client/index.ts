import axios, { Method, AxiosRequestConfig, AxiosError } from "axios";
import ono from '@jsdevtools/ono';
import Apps from "./resources/apps";
import Deployments from "./resources/deployments";
import Diagnostics from "./resources/diagnostics";
import Sellers from "./resources/sellers";
import Users from "./resources/users";

export interface ApiClientParams {
  endpoint: string;
  method: Method;
  body?: object;
  headers?: object;
  isFileUpload?: boolean;
}

export enum ApiClientErrors {
  BadRequest = "ERR_BAD_REQUEST",
  NotFound = "ERR_NOT_FOUND",
  Unauthorized = "ERR_UNAUTHORIZED",
  InternalServerError = "ERR_INTERNAL_SERVER",
  UnhandledError = "ERR_UNHANDLED"
}

export interface ApiClientError {
  code: ApiClientErrors;
  message: string;
}

/**
 * Create an instance of the APIClient.
 * @param {string} apiKey A valid API key.
 */
export default class APIClient {
  apps: Apps;

  deployments: Deployments;

  diagnostics: Diagnostics;

  sellers: Sellers;

  users: Users;

  apiKey: string;

  private debug: boolean;

  private _apiAuthority = "https://dip-webapi-dev.kubedev.sslocal.com/api";

  constructor(apiKey: string, debug = false) {
    this.apiKey = apiKey;

    this.apps = new Apps(this);
    this.deployments = new Deployments(this);
    this.diagnostics = new Diagnostics(this);
    this.sellers = new Sellers(this);
    this.users = new Users(this);
    this.debug = debug;
  }

  async call<T>({
    endpoint,
    method,
    body = {},
    headers = {},
    isFileUpload = false,
  }: ApiClientParams): Promise<T> {
    const defaultHeaders = {
      "content-type": "application/json",
      "api-key": this.apiKey,
    };

    if (this.debug) {
      axios.interceptors.request.use(request => {
        console.log('Starting Request', request)
        return request
      })

      axios.interceptors.response.use(response => {
        console.log('Response:', response)
        return response
      })
    }

    const mergedHeaders = {
      ...defaultHeaders,
      ...headers,
    };

    const request: AxiosRequestConfig = {
      headers: mergedHeaders,
      method: method,
      url: `${this._apiAuthority}/${endpoint}`,
      ...(isFileUpload && { maxContentLength: Infinity }),
    };


    if (body) request.data = body;

    try {
      const response = await axios(request);
      return response.data as T;
    } catch (error) {
      const err = error as AxiosError;

      if (this.debug) {
        console.log('Response:', err.response)
      }

      switch (err.response?.status) {
        case 400:
          throw ono({ code: ApiClientErrors.BadRequest }, err.response.data.message || "The request was invalid");
        case 401:
          throw ono({ code: ApiClientErrors.Unauthorized }, "The given API key is not valid");
        case 404:
          throw ono({ code: ApiClientErrors.NotFound }, "The record could not be found");
        case 500:
          throw ono({ code: ApiClientErrors.InternalServerError }, "The Connect API is experiencing issues");
        default:
          throw ono({ code: ApiClientErrors.UnhandledError }, "Unable to reach the Connect API - please make sure you are connected via the VPN");
      }
    }
  }
}
