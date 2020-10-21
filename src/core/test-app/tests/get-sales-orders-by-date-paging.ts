import { OrderApp, SalesOrderTimeRangePOJO } from "@shipengine/connect-sdk/lib/internal";
import Suite from "../runner/suite";
import {
  GetSalesOrdersByDatePagingConfigOptions,
  GetSalesOrdersByDatePagingTestParams,
} from "../runner/config/get-sales-orders-by-date-paging";
import reduceDefaultsWithConfig from '../utils/reduce-defaults-with-config';
import objectToTestTitle from '../utils/object-to-test-title';
import { initializeTimeStamps } from "../../utils/time-stamps";
import Test from '../runner/test';
import { v4 } from 'uuid';

interface TestArgs {
  title: string;
  methodArgs: SalesOrderTimeRangePOJO;
  config: unknown;
}

export class GetSalesOrdersByDatePaging extends Suite {
  title = "getSalesOrdersByDate_paging";

  buildTestArg(
    config: GetSalesOrdersByDatePagingConfigOptions,
  ): TestArgs | undefined {

    const { yesterday, today } = initializeTimeStamps();
    // Parse and Set Sensible defaults, merge in connects args

    const defaults = {
      startDateTime: yesterday,
      endDateTime: today,
      paging: {
        pageSize: 10,
        pageNumber: 1,
        pageCount: 5
      }
    };

    // Merge default data + connects args, and user-provided config, in that order
    const testParams = reduceDefaultsWithConfig<
      GetSalesOrdersByDatePagingTestParams
    >(defaults, config);


    const salesOrderTimeRange: SalesOrderTimeRangePOJO = {
      startDateTime: testParams.startDateTime,
      endDateTime: testParams.endDateTime,
      paging: testParams.paging
    }

    const title = config.expectedErrorMessage
      ? `it raises an error when calling getSalesOrdersByDate with paging data ${objectToTestTitle(testParams)}`
      : `it validates the getSalesOrdersByDate method with paging data ${objectToTestTitle(testParams)}`;

    return {
      title,
      methodArgs: salesOrderTimeRange,
      config,
    };
  }

  buildTestArgs(): Array<TestArgs | undefined> {
    if (Array.isArray(this.config)) {
      return this.config.map((config: GetSalesOrdersByDatePagingConfigOptions) => {
        return this.buildTestArg(config);
      });
    }
    const config = this.config as GetSalesOrdersByDatePagingConfigOptions;
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
          
          await orderApp.getSalesOrdersByDate(transaction, testArg.methodArgs);
        }
      );
    });
  }
}
