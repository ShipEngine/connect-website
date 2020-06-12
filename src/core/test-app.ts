import { SdkApp } from "./types";
import {
  CancelPickupsTestSuite,
  CancelShipmentsTestSuite,
  CreateManifestTestSuite,
  CreateShipmentTestSuite,
  // GetSalesOrderTestSuite,
  // GetSalesOrdersByDateTestSuite,
  // GetSellerTestSuite,
  RateShipmentTestSuite,
  SchedulePickupTestSuite,
  TrackShipmentTestSuite,
  // ShipmentCancelledTestSuite,
  // ShipmentCreatedTestSuite,
} from "./test-app/tests";
import { Tiny } from "./test-app/tiny-test";
import { logResults } from "./utils/log-helpers";
import { RunnerResults } from "./test-app/tiny-test/runner";

type RegisteredTestSuiteModules = object[];

// This code is terse. Find context/help below.
// https://stackoverflow.com/questions/57086672/element-implicitly-has-an-any-type-because-expression-of-type-string-cant-b
const _getKeyValue_ = (key: string) => (obj: Record<string, any>) => obj[key];

function registerTestSuiteModules(app: SdkApp): RegisteredTestSuiteModules {
  const carrierAppMethods = {
    cancelPickups: CancelPickupsTestSuite,
    cancelShipments: CancelShipmentsTestSuite,
    createManifest: CreateManifestTestSuite,
    createShipment: CreateShipmentTestSuite,
    rateShipment: RateShipmentTestSuite,
    schedulePickup: SchedulePickupTestSuite,
    trackShipment: TrackShipmentTestSuite,
  };

  const orderAppMethods = {
    // getSalesOrder: GetSalesOrderTestSuite,
    // getSalesOrdersByDate: GetSalesOrdersByDateTestSuite,
    // getSeller: GetSellerTestSuite,
    // shipmentCancelled: ShipmentCancelledTestSuite,
    // shipmentCreated: ShipmentCreatedTestSuite,
  };

  const allMethods = { ...carrierAppMethods, ...orderAppMethods };

  const registeredTestSuiteModules: RegisteredTestSuiteModules = [];

  for (let method in allMethods) {
    if (Reflect.get(app, method)) {
      registeredTestSuiteModules.push(_getKeyValue_(method)(allMethods));
    }
  }

  return registeredTestSuiteModules;
}

export default async function testApp(
  app: SdkApp,
  {
    grep,
    failFast,
    concurrency,
    debug,
  }: { grep?: string; failFast: boolean; concurrency: number; debug: boolean },
): Promise<RunnerResults> {
  const registeredTestSuiteModules = registerTestSuiteModules(app);

  const tinyTest = Tiny(app, registeredTestSuiteModules, {
    grep,
    failFast,
    concurrency,
    debug,
  });

  const testResults = await tinyTest.run();

  logResults(testResults);

  return testResults;
}
