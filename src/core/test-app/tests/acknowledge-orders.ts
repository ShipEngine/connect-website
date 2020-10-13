import { OrderApp, SalesOrderNotificationPOJO } from "@shipengine/connect-sdk/lib/internal";
import Suite from "../runner/suite";
import {
  AcknowledgeOrdersConfigOptions,
  AcknowledgeOrdersTestParams,
} from "../runner/config/acknowledge-orders";
import reduceDefaultsWithConfig from '../utils/reduce-defaults-with-config';
import objectToTestTitle from '../utils/object-to-test-title';
import Test from '../runner/test';
import { v4 } from 'uuid';

interface TestArgs {
  title: string;
  methodArgs: AcknowledgeOrdersTestParams;
  config: unknown;
}

export class AcknowledgeOrders extends Suite {
  title = "acknowledgeOrders";

  buildTestArg(
    config: AcknowledgeOrdersConfigOptions,
  ): TestArgs | undefined {

    // Parse and Set Sensible defaults, merge in connects args
    const notifications: SalesOrderNotificationPOJO[] = [
    	{
    		id: '989798798',
    		identifiers: {
    			id: 'lksldm',
    		},
    		orderNumber: "987987987",
  			importedDate: "2005-09-23T17:30:00+05:30",
    	}
    ];
    const defaults = {
    	notifications: notifications,
    };

    // Merge default data + connects args, and user-provided config, in that order
    const testParams = reduceDefaultsWithConfig<
      AcknowledgeOrdersTestParams
    >(defaults, config);

    const title = config.expectedErrorMessage
      ? `it raises an error when creating a connection form with ${objectToTestTitle(
        testParams,
      )}`
      : `it validates the acknowledgeOrders method with ${objectToTestTitle(
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
      return this.config.map((config: AcknowledgeOrdersConfigOptions) => {
        return this.buildTestArg(config);
      });
    }
    const config = this.config as AcknowledgeOrdersConfigOptions;
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
          const orderApp = this.app as OrderApp;
          const transaction = await this.transaction(testArg.config);

          if (!orderApp.acknowledgeOrders) {
          	throw new Error("acknowledgeOrders is not implemented");
          }
          
          await orderApp.acknowledgeOrders(transaction, testArg.methodArgs.notifications);
        }
      );
    });
  }
}
