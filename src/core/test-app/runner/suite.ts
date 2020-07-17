import Test from "./test";
import { SdkApp } from "../../types";
import { TestsConfig } from "./config";
import { TransactionPOJO } from "@shipengine/integration-platform-sdk";
import { v4 } from "uuid";

interface ConstructorArgs {
  app: SdkApp;
  config?: TestsConfig;
  options: any;
}

export default abstract class Suite {
  abstract title: string;
  protected app: SdkApp;
  protected _config?: TestsConfig;
  protected _rawConfig: TestsConfig;
  protected options: any;

  constructor({ app, config, options }: ConstructorArgs) {
    this.app = app;
    this._rawConfig = config || {};
    this.options = options;
  }

  get config(): TestsConfig {
    if (this._config) return this._config;

    const config = Reflect.get(this._rawConfig, this.title);

    if (config) {
      this._config = config;
      return config;
    } else {
      this._config = {};
      return {};
    }
  }

  abstract tests(): Test[];

  protected test(title: string, methodArgs: any, config: any, fn: any): Test {
    const testConfig = {
      debug:
        this.options.cli.debug ||
        config.debug ||
        this.options.rootConfig.debug ||
        this.options.defaults.debug,
      expectedErrorMessage: config.expectedErrorMessage,
      retries:
        this.options.cli.retries ||
        config.retries ||
        this.options.rootConfig.retries ||
        this.options.defaults.retries,
      skip: config.skip,
      timeout:
        this.options.cli.timeout ||
        config.timeout ||
        this.options.rootConfig.timeout ||
        this.options.defaults.timeout,
    };

    return { title, fn, methodArgs, ...testConfig };
  }

  protected transaction(): TransactionPOJO {
    const transaction: TransactionPOJO = {
      id: v4(),
      isRetry: false,
      useSandbox: false,
      session: {},
    };

    return transaction;
  }
}
