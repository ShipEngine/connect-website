import jsf from 'json-schema-faker';
import { JSONSchema6 } from 'json-schema';
import { CarrierApp, TransactionPOJO } from "@shipengine/connect-sdk/lib/internal";
import Suite from "../runner/suite";
import {
  ConnectionFormConfigOptions,
  ConnectionFormTestParams,
} from "../runner/config/connect-all-fields";
import reduceDefaultsWithConfig from '../utils/reduce-defaults-with-config';
import objectToTestTitle from '../utils/object-to-test-title';
import Test from '../runner/test';
import { v4 } from 'uuid';

interface TestArgs {
  title: string;
  methodArgs: ConnectionFormTestParams;
  config: unknown;
}

interface FormDef {
  dataSchema: JSONSchema6
}

export class ConnectionForm extends Suite {
  title = "connect_all_fields";

  private buildFormData(connectionForm: FormDef) {
    const fakeData = jsf.generate(connectionForm) as FormDef;
    return fakeData.dataSchema;
  }

  buildTestArg(
    config: ConnectionFormConfigOptions,
  ): TestArgs | undefined {

    const carrierApp = this.app as CarrierApp;

    // Parse and Set Sensible defaults, merge in connects args
    const defaults = {
      ...this.buildFormData(carrierApp.connectionForm),
      ...this.options.staticRootConfig.connectArgs
    } as ConnectionFormTestParams;

    // Merge default data + connects args, and user-provided config, in that order
    const testParams = reduceDefaultsWithConfig<
      ConnectionFormTestParams
    >(defaults, config.connectionFormData ? config.connectionFormData : {});

    const title = config.expectedErrorMessage
      ? `it raises an error when creating a connection form with ${objectToTestTitle(
        testParams,
      )}`
      : `it validates the connection form with ${objectToTestTitle(
        testParams,
      )}`;

    return {
      title,
      methodArgs: testParams,
      config,
    };
  }

  buildTestArgs(): Array<TestArgs | undefined> {
    if (Array.isArray(this.config)) {
      return this.config.map((config: ConnectionFormConfigOptions) => {
        return this.buildTestArg(config);
      });
    }
    const config = this.config as ConnectionFormConfigOptions;
    return [this.buildTestArg(config)];
  }

  tests(): Test[] {
    const testArgs = this.buildTestArgs().filter((args) => args !== undefined) as TestArgs[];

    return testArgs.map((testArg) => {
      return this.test(
        testArg.title,
        testArg.methodArgs,
        testArg.config,
        async () => {
          const carrierApp = this.app as CarrierApp;
          const transaction = {
            id: v4(),
            session: {},
          };

          if (!carrierApp.connect) {
            throw new Error("createShipment is not implemented");
          }

          await carrierApp.connect(transaction, testArg.methodArgs);
        }
      );
    });
  }
}
