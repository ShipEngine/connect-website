import { OrderApp, SalesOrderTimeRangePOJO } from "@shipengine/connect-sdk/lib/internal";
import Suite from "../runner/suite";
import {
  GetSalesOrdersByDateConfigOptions,
  GetSalesOrdersByDateTestParams,
} from "../runner/config/get-sales-orders-by-date";
import reduceDefaultsWithConfig from '../utils/reduce-defaults-with-config';
import objectToTestTitle from '../utils/object-to-test-title';
import { initializeTimeStamps } from "../../utils/time-stamps";
import Test from '../runner/test';
import { v4 } from 'uuid';

interface TestArgs {
  title: string;
  methodArgs: GetSalesOrdersByDateTestParams;
  config: unknown;
}

export class GetSalesOrdersByDate extends Suite {
  title = "getSalesOrdersByDate";

  buildTestArg(
    config: GetSalesOrdersByDateConfigOptions,
  ): TestArgs | undefined {

    const { yesterday, today } = initializeTimeStamps();
    // Parse and Set Sensible defaults, merge in connects args
    const salesOrderTimeRange: SalesOrderTimeRangePOJO = {
      startDateTime: yesterday,
      endDateTime: today
    }

    const defaults = {
      timeRange: salesOrderTimeRange,
    };

    // Merge default data + connects args, and user-provided config, in that order
    const testParams = reduceDefaultsWithConfig<
      GetSalesOrdersByDateTestParams
    >(defaults, config);

    const title = config.expectedErrorMessage
      ? `it raises an error when calling getSalesOrdersByDate with ${objectToTestTitle(testParams)}`
      : `it validates the getSalesOrdersByDate method with ${objectToTestTitle(testParams)}`;

    return {
      title,
      methodArgs: testParams,
      config,
    };
  }

  buildTestArgs(): Array<TestArgs | undefined> {
    if (Array.isArray(this.config)) {
      return this.config.map((config: GetSalesOrdersByDateConfigOptions) => {
        return this.buildTestArg(config);
      });
    }
    const config = this.config as GetSalesOrdersByDateConfigOptions;
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

          if (!orderApp.getSalesOrdersByDate) {
          	throw new Error("getSalesOrdersByDate is not implemented");
          }
          
          await orderApp.getSalesOrdersByDate(transaction, testArg.methodArgs.timeRange);
        }
      );
    });
  }
}
