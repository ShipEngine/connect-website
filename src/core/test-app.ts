import Config from "./test-app/runner/config";
import Runner from "./test-app/runner";
import loadAndValidateApp, { isInvalidAppError } from "./load-and-validate-app";
import {
  CreateShipmentInternational,
  CreateShipmentDomestic,
  CreateShipmentWithInsurance,
  CreateShipmentMultiPackage,
  RateShipment,
  CreateShipmentReturn,
  TrackShipment, 
  CancelPickupsNextDay,
  TrackShipmentReturn,
  SameDayPickup,
  NextDayPickup,
  CancelPickupsSameDay,
  RateShipmentReturn,
  CancelShipmentsSingle,
  CancelShipmentsMultiple,
  RateShipmentWithAllServices
} from "./test-app/tests";
import { SdkApp } from "./types";
import { TestResults, useTestResults } from "./test-app/runner/test-results";
import { loadAndValidateConfig, LoadAndValidateConfigError } from "./test-app/runner/load-and-validate-config";
import { logFail, logPass, logStep } from "./utils/log-helpers";
import { logResults } from "./utils/log-helpers";

export const TestAppErrors = LoadAndValidateConfigError;

interface TestOptions {
  debug?: boolean;
  failFast?: boolean;
  grep?: string;
  retries?: number;
  timeout?: number;
}

export default async function testApp(
  pathToApp: string,
  { debug, failFast, grep, retries, timeout }: TestOptions,
): Promise<TestResults> {
  const [testResults, testResultsReducer] = useTestResults();

  // Set NODE_ENV first because its possible that the shipengine.config
  // might key off the process.env to set environment variables
  process.env.NODE_ENV = "test";

  let staticConfig: Config = {};

  try {
    staticConfig = await loadAndValidateConfig(pathToApp);
  } catch (error) {
    switch (error.code) {
      case LoadAndValidateConfigError.SchemaInvalid:
      case LoadAndValidateConfigError.Syntax:
        throw error;
      default:
        // IF the file doesnt exist an error will be thrown and we want to swallow that here
        break;
    }
  }

  let app: SdkApp;

  try {
    logStep("validating app structure");

    app = await loadAndValidateApp(pathToApp);

    logPass("app structure is valid");
    testResultsReducer("INCREMENT_PASSED");
  } catch (error) {

    if (isInvalidAppError(error)) {
      const errorsCount = error.errors.length;
      const errorsWithInflection = errorsCount > 1 ? "errors" : "error";

      logFail(
        `App structure is not valid - ${errorsCount} ${errorsWithInflection} found`,
      );

      error.errors.forEach((errorMessage: string) => {
        logFail(errorMessage);
      });

      for (let i = 0; i < errorsCount; i++) {
        testResultsReducer("INCREMENT_FAILED");
      }

      logResults(testResults);
      return testResults;
    }

    throw error;
  }

  const options = {
    defaults: {
      connectArgs: {},
      debug: false,
      failFast: false,
      retries: 0,
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
    cancelShipments: [CancelShipmentsSingle, CancelShipmentsMultiple],
    // createManifest: [CreateManifestTestSuite],
    createShipment: [
      CreateShipmentInternational,
      CreateShipmentDomestic,
      CreateShipmentMultiPackage,
      CreateShipmentWithInsurance,
      CreateShipmentReturn
    ],
    cancelPickups: [CancelPickupsSameDay, CancelPickupsNextDay],
    schedulePickup: [SameDayPickup, NextDayPickup],
    rateShipment: [
      RateShipment,
      RateShipmentWithAllServices,
      RateShipmentReturn
    ],
    trackShipment: [TrackShipment, TrackShipmentReturn],
  };

  const orderAppMethods = {
    // getSalesOrdersByDate: [GetSalesOrdersByDateTestSuite],
    // shipmentCancelled: [ShipmentCancelledTestSuite],
    // shipmentCreated: [ShipmentCreatedTestSuite],
  };

  const allMethods = { ...carrierAppMethods, ...orderAppMethods };

  let registeredTestSuiteModules: RegisteredTestSuiteModules = [];

  for (const method in allMethods) {
    if (Reflect.get(app, method)) {
      registeredTestSuiteModules = registeredTestSuiteModules.concat(
        Reflect.get(allMethods, method),
      );
    }
  }

  return registeredTestSuiteModules;
}
