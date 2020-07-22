import Config from "./test-app/runner/config";
import Runner from "./test-app/runner";
import loadAndValidateApp from "./load-and-validate-app";
import { CreateShipmentInternational, CreateShipmentDomestic, CreateShipmentMultiPackage } from "./test-app/tests";
import { SdkApp } from "./types";
import { TestResults, useTestResults } from "./test-app/runner/test-results";
import { loadAndValidateConfig } from "./test-app/runner/load-and-validate-config";
import { logFail, logPass, logStep } from "./utils/log-helpers";
import { logResults } from "./utils/log-helpers";
import { CreateShipmentInsured } from './test-app/tests/create-shipment-insured';

interface TesOptions {
  debug?: boolean;
  failFast?: boolean;
  grep?: string;
  retries?: number;
  timeout?: number;
}

export default async function testApp(
  pathToApp: string,
  { debug, failFast, grep, retries, timeout }: TesOptions,
): Promise<TestResults> {
  const [testResults, testResultsReducer] = useTestResults();

  let app: SdkApp;

  try {
    logStep("validating app structure");

    app = await loadAndValidateApp(pathToApp);

    logPass("app structure is valid");
    testResultsReducer("INCREMENT_PASSED");
  } catch (error) {
    switch (error.code) {
      case "INVALID_APP":
        // eslint-disable-next-line no-case-declarations
        const errorsCount = error.errors.length;
        // eslint-disable-next-line no-case-declarations
        const errorsWithInflection = errorsCount > 1 ? "errors" : "error";

        logFail(
          `App structure is not valid - ${errorsCount} ${errorsWithInflection} found`
        );

        error.errors.forEach((errorMessage: string) => {
          logFail(errorMessage);
        });

        for (let i = 0; i < errorsCount; i++) {
          testResultsReducer("INCREMENT_FAILED");
        }

        logResults(testResults);
        return testResults;
      default:
        throw error;
    }
  }

  // Set NODE_ENV first because its possible that the shipengine.config
  // might key off the process.env to set environment variables
  process.env.NODE_ENV = "test";

  let staticConfig: Config = {};

  try {
    staticConfig = await loadAndValidateConfig(pathToApp);
  } catch {
    // Do nothing
  }

  const options = {
    defaults: {
      connectArgs: {},
      debug: false,
      failFast: false,
      retries: 1,
      session: {},
      timeout: 2000,
    },
    staticRootConfig: {
      connectArgs: staticConfig.connectArgs,
      debug: staticConfig.debug,
      failFast: staticConfig.failFast,
      retries: staticConfig.retries,
      session: staticConfig.session,
      timeout: staticConfig.timeout,
    },
    cli: {
      debug,
      failFast,
      retries,
      timeout,
    },
    failFast(): boolean {
      return (
        this.cli.failFast ||
        this.staticRootConfig.failFast ||
        this.defaults.failFast
      );
    },
  };

  const registeredTestSuiteModules = registerTestSuiteModules(app);

  const suites = registeredTestSuiteModules.map(
    (suite: any) =>
      new suite({
        app,
        staticConfigTests: staticConfig.tests,
        options: options,
      }),
  );

  await new Runner({
    failFast: options.failFast(),
    grep: grep,
    suites,
    testResults,
    testResultsReducer,
  }).run();

  logResults(testResults);

  return testResults;
}

type RegisteredTestSuiteModules = object[];

function registerTestSuiteModules(app: SdkApp): RegisteredTestSuiteModules {
  const carrierAppMethods = {
    // cancelPickups: [CancelPickupsTestSuite],
    // cancelShipments: [CancelShipmentsTestSuite],
    // createManifest: [CreateManifestTestSuite],
    createShipment: [
      CreateShipmentInternational, 
      CreateShipmentDomestic, 
      CreateShipmentMultiPackage,
      CreateShipmentInsured
    ],
    // rateShipment: [RateShipmentTestSuite],
    // schedulePickup: [SchedulePickupTestSuite],
    // trackShipment: [TrackShipmentTestSuite],
  };

  const orderAppMethods = {
    // getSalesOrder: [GetSalesOrderTestSuite],
    // getSalesOrdersByDate: [GetSalesOrdersByDateTestSuite],
    // getSeller: [GetSellerTestSuite],
    // shipmentCancelled: [ShipmentCancelledTestSuite],
    // shipmentCreated: [ShipmentCreatedTestSuite],
  };

  const allMethods = { ...carrierAppMethods, ...orderAppMethods };

  let registeredTestSuiteModules: RegisteredTestSuiteModules = [];

  for (let method in allMethods) {
    if (Reflect.get(app, method)) {
      registeredTestSuiteModules = registeredTestSuiteModules.concat(
        Reflect.get(allMethods, method),
      );
    }
  }

  return registeredTestSuiteModules;
}