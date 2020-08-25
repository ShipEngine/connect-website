import Test from "./test";
import { SdkApp } from "../../types";
import { TestsConfig } from "./config";
import { TransactionPOJO } from "@shipengine/connect-sdk/lib/internal";
import { log, logObject, indent } from "../../utils/log-helpers";
import { v4 } from "uuid";
import chalk from "chalk";

interface ConstructorArgs {
  app: SdkApp;
  options: any;
  staticConfigTests?: TestsConfig;
}

export default abstract class Suite {
  abstract title: string;

  protected app: SdkApp;

  protected _staticConfigTests?: TestsConfig;

  protected _rawStaticConfigTests: TestsConfig;

  protected options: any;

  constructor({ app, staticConfigTests, options }: ConstructorArgs) {
    this.app = app;
    this._rawStaticConfigTests = staticConfigTests || {};
    this.options = options;
  }

  get config(): TestsConfig {
    if (this._staticConfigTests) return this._staticConfigTests;

    const config: TestsConfig | undefined = Reflect.get(
      this._rawStaticConfigTests,
      this.title,
    );

    if (config) {
      this._staticConfigTests = config;
    } else {
      this._staticConfigTests = {};
    }

    return this._staticConfigTests;
  }

  abstract tests(): Test[];

  protected test(title: string, methodArgs: any, config: any, fn: any): Test {
    const testConfig = {
      debug:
        this.options.cli.debug ||
        config.debug ||
        this.options.staticRootConfig.debug ||
        this.options.defaults.debug,
      expectedErrorMessage: config.expectedErrorMessage,
      retries:
        this.options.cli.retries ||
        config.retries ||
        this.options.staticRootConfig.retries ||
        this.options.defaults.retries,
      skip: config.skip,
      timeout:
        this.options.cli.timeout ||
        config.timeout ||
        this.options.staticRootConfig.timeout ||
        this.options.defaults.timeout,
    };

    return { title, fn, methodArgs, ...testConfig };
  }

  protected async transaction(config: any): Promise<TransactionPOJO> {
    const testConfig = {
      debug:
        this.options.cli.debug ||
        config.debug ||
        this.options.staticRootConfig.debug ||
        this.options.defaults.debug,
      expectedErrorMessage: config.expectedErrorMessage,
      retries:
        this.options.cli.retries ||
        config.retries ||
        this.options.staticRootConfig.retries ||
        this.options.defaults.retries,
      skip: config.skip,
      timeout:
        this.options.cli.timeout ||
        config.timeout ||
        this.options.staticRootConfig.timeout ||
        this.options.defaults.timeout,
    };

    if (
      !config.connectArgs &&
      (config.session || this.options.staticRootConfig.session)
    ) {
      const transaction: TransactionPOJO = {
        id: v4(),
        useSandbox: false,
        session: config.session || this.options.staticRootConfig.session,
      };

      if (testConfig.debug) {
        log(
          chalk.yellow(
            `${indent(2)}using the session provided in connect.config.js`,
          ),
        );
        logObject(transaction);
      }

      return transaction;
    }

    if (config.connectArgs || this.options.staticRootConfig.connectArgs) {
      if (testConfig.debug) {
        log(
          chalk.yellow(
            `${indent(
              2,
            )}calling the connect method to set the session for the transaction with the connectArgs given in connect.config.js`,
          ),
        );
        logObject(
          config.connectArgs || this.options.staticRootConfig.connectArgs,
        );
      }

      const transaction: TransactionPOJO = {
        id: v4(),
        useSandbox: false,
        session: {},
      };

      // const retries = 0;
      // TODO - handle retry and timeout logic here
      // test.retries
      // test.timeout
      // Note if the app is definitions only we should have exited before we got here
      await this.app.connect!(
        transaction,
        config.connectArgs || this.options.staticRootConfig.connectArgs,
      );

      if (testConfig.debug) {
        log(chalk.green(`${indent(2)}the connect method ran successfully`));
        logObject(transaction);
      }

      return transaction;
    }

    const transaction: TransactionPOJO = {
      id: v4(),
      useSandbox: false,
      session: {},
    };

    if (testConfig.debug) {
      log(
        chalk.yellow(
          `${indent(
            2,
          )}connectArgs are not defined in connect.config.js the session value will be an empty object `,
        ),
      );
      logObject(transaction);
    }

    return transaction;
  }
}
