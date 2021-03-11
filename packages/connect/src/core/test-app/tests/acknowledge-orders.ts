import { OrderApp, SalesOrderNotificationPOJO } from "@shipengine/connect-sdk/lib/internal";
import Suite from "../runner/suite";
import {
  AcknowledgeOrdersConfigOptions,
  AcknowledgeOrdersTestParams,
} from "../runner/config/acknowledge-orders";
import reduceDefaultsWithConfig from '../utils/reduce-defaults-with-config';
import objectToTestTitle from '../utils/object-to-test-title';
import { initializeTimeStamps } from "../../utils/time-stamps";
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

    const { todayEvening } = initializeTimeStamps();
    // Parse and Set Sensible defaults, merge in connects args
    const notifications: SalesOrderNotificationPOJO[] = [
    	{
    		id: '989798798',
    		identifiers: {
    			id: 'lksldm',
    		},
    		orderNumber: "987987987",
  			importedDate: todayEvening,
    	}
    ];

    const defaults = {
    	notifications: notifications
    };

    // Merge default data + connects args, and user-provided config, in that order
    const testParams = reduceDefaultsWithConfig<
      AcknowledgeOrdersTestParams
    >(defaults, config);

    const title = config.expectedErrorMessage
      ? `it raises an error when calling the acknowledgeOrders method with notifications ${objectToTestTitle(testParams)}`
      : `it validates the acknowledgeOrders method with notifications ${objectToTestTitle(testParams)}`;

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

          const transaction = {
            id: v4(),
            language: "en",
            session: {}
          };

          if (this.options.staticRootConfig.session
            && this.options.staticRootConfig.session.auth
            && this.options.staticRootConfig.session.auth.accessToken) {
            transaction.session = {
              auth: {
                accessToken: this.options.staticRootConfig.session.auth.accessToken
              }
            }
          }

          if (!orderApp.acknowledgeOrders) {
          	throw new Error("acknowledgeOrders is not implemented");
          }
          
          await orderApp.acknowledgeOrders(transaction, testArg.methodArgs.notifications);
        }
      );
    });
  }
}
