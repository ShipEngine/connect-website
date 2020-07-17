import Runner from "./test-app/runner";
import loadAndValidateApp from "./load-and-validate-app";
import { CreateShipmentInternational } from "./test-app/tests";
import { SdkApp } from "./types";
import { TestResults, useTestResults } from "./test-app/runner/test-results";
import { loadAndValidateConfig } from "./test-app/runner/load-and-validate-config";
import { logFail, logPass, logStep } from "./utils/log-helpers";
import { logResults } from "./utils/log-helpers";

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
          `App structure is not valid - ${errorsCount} ${errorsWithInflection} found`,
          false,
        );

        error.errors.forEach((errorMessage: string) => {
          logFail(errorMessage);
        });

        testResultsReducer("INCREMENT_FAILED");
        logResults(testResults);
        return testResults;
      default:
        throw error;
    }
  }

  // Set NODE_ENV first because its possible that the shipengine.config
  // might key off the process.env to set environment variables
  process.env.NODE_ENV = "test";

  let config = {};

  try {
    config = await loadAndValidateConfig(pathToApp);
  } catch {
    // Do nothing
  }

  const options = {
    defaults: {
      debug: false,
      failFast: false,
      retries: 1,
      timeout: 2000,
    },
    rootConfig: {
      debug: config.debug,
      failFast: config.failFast,
      retries: config.retries,
      timeout: config.timeout,
    },
    cli: {
      debug,
      failFast,
      retries,
      timeout,
    },
    debug(): boolean {
      return this.cli.debug || this.rootConfig.debug || this.defaults.debug;
    },
    failFast(): boolean {
      return (
        this.cli.failFast || this.rootConfig.failFast || this.defaults.failFast
      );
    },
  };

  const registeredTestSuiteModules = registerTestSuiteModules(app);

  const suites = registeredTestSuiteModules.map(
    (suite: any) =>
      new suite({
        app,
        config: config.tests,
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
    createShipment: [CreateShipmentInternational],
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
