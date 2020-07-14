// import Test from "./test";
import { SdkApp } from "../../types";
import { TransactionPOJO } from "@shipengine/integration-platform-sdk";
import { TestsConfig } from "./config";
import Test from "./test";

// This code is terse. Find context/help below.
// https://stackoverflow.com/questions/57086672/element-implicitly-has-an-any-type-because-expression-of-type-string-cant-b
const _getKeyValue_ = (key: string) => (obj: Record<string, any>) => obj[key];

interface ConstructorArgs {
  app: SdkApp;
  config?: TestsConfig;
  options: any;
  transaction: TransactionPOJO;
}

export default abstract class Suite {
  abstract title: string;
  protected app: SdkApp;
  protected transaction: TransactionPOJO;
  protected _config?: TestsConfig;
  protected _rawConfig: TestsConfig;
  protected options: any;

  constructor({ app, config, options, transaction }: ConstructorArgs) {
    this.app = app;
    this.transaction = transaction;
    this._rawConfig = config || {};
    this.options = options;
  }

  get config(): TestsConfig {
    if (this._config) return this._config;

    const config = _getKeyValue_(this.title)(this._rawConfig);

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
}
