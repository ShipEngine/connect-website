import { JSONSchema6 } from 'json-schema';
import RandExp from "randexp";
import { FormDefinition } from "@shipengine/connect-sdk";
import { CarrierApp } from "@shipengine/connect-sdk/lib/internal";
import Suite from "../runner/suite";
import {
  ConnectionFormConfigOptions,
  ConnectionFormTestParams,
} from "../runner/config/connection-form";
import reduceDefaultsWithConfig from '../utils/reduce-defaults-with-config';
import objectToTestTitle from '../utils/object-to-test-title';

import { expect } from "chai";
import Test from '../runner/test';

interface TestArgs {
  title: string;
  methodArgs: ConnectionFormTestParams;
  config: unknown;
}

interface FormDef {
  dataSchema: JSONSchema6
}

export class ConnectionForm extends Suite {
  title = "connectionForm";

  private buildFormData(connectionForm: FormDef) : object {
    if (connectionForm.dataSchema.required) {
      return connectionForm.dataSchema.required.reduce((acc: Record<string, unknown>, field: string) => { 
        const { type, minLength, maxLength, pattern } = connectionForm.dataSchema.properties![field] as JSONSchema6;
        const stringLength = minLength ? minLength : (maxLength || 5);

        if (type == 'boolean') {
          acc[field] = true;
        } else if (type == 'string') {
          let randexp;
          if (pattern) {
            randexp = new RandExp(`[${pattern}]{${stringLength}}`);
          } else {
            randexp = new RandExp(`[a-z]{${stringLength}}`);
          }
          acc[field] = randexp.gen();
        } else {
          acc[field] = 1;
        }

        return acc;
      }, {});
    } else {
      return {};
    }
  }

  buildTestArg(
    config: ConnectionFormConfigOptions,
  ): TestArgs | undefined {

    // Make a best guess at the defaults, need to resolve the default vs config based delivery service early
    // on since that determines what address and associated timezones get generated.
    const defaults: ConnectionFormTestParams = {
      connectionFormData: {},
    };

    const testParams = reduceDefaultsWithConfig<
      ConnectionFormTestParams
    >(defaults, config);

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

    if (testArgs.length === 0) {
      return [];
    }
    return testArgs.map((testArg) => {
      return this.test(
        testArg.title,
        testArg.methodArgs,
        testArg.config,
        async () => {

          const carrierApp = this.app as CarrierApp;

          const transaction = await this.transaction(testArg.config);
          const connectionFormData = this.buildFormData(carrierApp.connectionForm);

          if (!carrierApp.connect) {
            throw new Error("createShipment is not implemented");
          }

          await carrierApp.connect(transaction, connectionFormData);
        }
      );
    });
  }
}
