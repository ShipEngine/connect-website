import Runner from "./test-app/runner";
import { CreateShipmentDomestic } from "./test-app/tests";
import { SdkApp } from "./types";
import { TestResults, useTestResults } from "./test-app/runner/test-results";
import { TransactionPOJO } from "@shipengine/integration-platform-sdk";
import { loadAndValidateConfig } from "./test-app/runner/load-and-validate-config";
import { loadApp } from "@shipengine/integration-platform-loader";
import { logFail, logPass, logStep, log, logObject } from "./utils/log-helpers";
import { logResults } from "./utils/log-helpers";
import { v4 } from "uuid";

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

  // Load app. We already know it should be valid at this point.
  const app = (await loadApp(pathToApp)) as SdkApp;

  // Set NODE_ENV first because its possible that the shipengine.config
  // might key off the process.env to set environment variables
  process.env.NODE_ENV = "test";

  const config = await loadAndValidateConfig(pathToApp);

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

  const connectCredentials = config.connect_credentials
    ? config.connect_credentials
    : {};

  logStep("calling the connect method to set the session");

  if (options.debug()) {
    log("connect_credentials:");
    logObject(connectCredentials);
  }

  const transaction: TransactionPOJO = {
    id: v4(),
    isRetry: false,
    useSandbox: false,
    session: {},
  };

  // const retries = 0;
  // TODO - handle retry and timeout logic here
  // test.retries
  // test.timeout
  try {
    // Note if the app is definitions only we should have exited before we got here
    await app.connect!(transaction, connectCredentials);
    logPass("connect successfully set the session");
    testResultsReducer("INCREMENT_PASSED");
    if (options.debug()) {
      log("result:");
      logObject(transaction);
    }
  } catch (error) {
    logFail(error.message);
    testResultsReducer("INCREMENT_FAILED");
    return testResults;
  }

  const registeredTestSuiteModules = registerTestSuiteModules(app);

  const suites = registeredTestSuiteModules.map(
    (suite: any) =>
      new suite({
        app,
        config: config.tests,
        options: options,
        transaction,
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

// This code is terse. Find context/help below.
// https://stackoverflow.com/questions/57086672/element-implicitly-has-an-any-type-because-expression-of-type-string-cant-b
const _getKeyValue_ = (key: string) => (obj: Record<string, any>) => obj[key];

function registerTestSuiteModules(app: SdkApp): RegisteredTestSuiteModules {
  const carrierAppMethods = {
    // cancelPickups: [CancelPickupsTestSuite],
    // cancelShipments: [CancelShipmentsTestSuite],
    // createManifest: [CreateManifestTestSuite],
    createShipment: [CreateShipmentDomestic],
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
        _getKeyValue_(method)(allMethods),
      );
    }
  }

  return registeredTestSuiteModules;
}
