import { OrderApp, SalesOrderShipmentPOJO } from "@shipengine/connect-sdk/lib/internal";
import Suite from "../runner/suite";
import {
  ShipmentCreatedConfigOptions,
  ShipmentCreatedTestParams,
} from "../runner/config/shipment-created";
import reduceDefaultsWithConfig from '../utils/reduce-defaults-with-config';
import objectToTestTitle from '../utils/object-to-test-title';
import { initializeTimeStamps } from "../../utils/time-stamps";
import Test from '../runner/test';
import { v4 } from 'uuid';
import { buildAddressWithContactInfo } from '../factories/address';

interface TestArgs {
  title: string;
  methodArgs: SalesOrderShipmentPOJO;
  config: unknown;
}

export class ShipmentCreated extends Suite {
  title = "shipmentCreated";

  buildTestArg(
    config: ShipmentCreatedConfigOptions,
  ): TestArgs | undefined {

    const { tomorrow } = initializeTimeStamps();

    const defaults: ShipmentCreatedConfigOptions = {
      trackingURL: undefined,
      trackingNumber: undefined,
      salesOrder: {
        id: "123456"
      },
      carrierCode: undefined,
      carrierServiceCode: undefined,
      shipFrom: buildAddressWithContactInfo("US-from")!,
      shipTo: buildAddressWithContactInfo("US-to")!,
      shipDateTime: tomorrow,
      contents: [{
        salesOrderItem: {
          id: "123456"
        },
        quantity: {
          value: 1
        }
      }]
    };

    // Merge default data + connects args, and user-provided config, in that order
    const testParams = reduceDefaultsWithConfig<
      ShipmentCreatedTestParams
    >(defaults, config);

    const salesOrderShipment: SalesOrderShipmentPOJO = {
      trackingURL: testParams.trackingURL,
      trackingNumber: testParams.trackingNumber,
      salesOrder: testParams.salesOrder,
      carrierCode: testParams.carrierCode,
      shipFrom: testParams.shipFrom,
      shipTo: testParams.shipTo,
      shipDateTime: tomorrow,
      contents: testParams.contents
    }

    const title = config.expectedErrorMessage
      ? `it raises an error when calling the shipmentCreated method with ${objectToTestTitle(testParams)}`
      : `it validates the shipmentCreated method with ${objectToTestTitle(testParams)}`;

    return {
      title,
      methodArgs: salesOrderShipment,
      config,
    };
  }

  buildTestArgs(): Array<TestArgs | undefined> {
    if (Array.isArray(this.config)) {
      return this.config.map((config: ShipmentCreatedConfigOptions) => {
        return this.buildTestArg(config);
      });
    }
    const config = this.config as ShipmentCreatedConfigOptions;
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

          if (!orderApp.shipmentCreated) {
            throw new Error("shipmentCreated is not implemented");
          }

          await orderApp.shipmentCreated(transaction, testArg.methodArgs);
        }
      );
    });
  }
}
