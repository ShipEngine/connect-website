import Suite from "./suite";
import { SdkApp } from "../../types";
import { Runner, RunnerResults } from "./runner";
import { v4 } from "uuid";
import { TransactionPOJO, SellerIdentifierPOJO, SalesOrderIdentifierPOJO, SalesOrderShipmentPOJO, SalesOrderTimeRangePOJO } from "@shipengine/integration-platform-sdk";
import {
  logFail,
  logPass,
  logStep,
  log,
  logObject,
} from "../../utils/log-helpers";
import { loadStaticConfig } from './load-static-config';

function filterTests(grep: string, suites: Suite[]): Suite[] {
  let tempSuites = suites.filter((suite) => suite.title === grep);

  if (tempSuites.length === 0) {
    tempSuites = suites.filter((suite) => {
      let tests = suite._testCache.filter((test) => test.sha.includes(grep));
      if (tests.length === 1) {
        suite.testCache = tests;
        return true;
      } else {
        return false;
      }
    });
  }

  return tempSuites;
}

export interface TinyStaticConfig {
  negateTests?: string[];
  methods?: {
    connectionFormDataProps?: object;
    getSeller?: SellerIdentifierPOJO[];
    getSalesOrder?: SalesOrderIdentifierPOJO[];
    getSalesOrdersByDate?: SalesOrderTimeRangePOJO[];
    shipmentCreated?: SalesOrderShipmentPOJO[];
    shipmentCancelled?: SalesOrderShipmentPOJO[];
  }
}

interface TinyOptions {
  grep: string | undefined;
  failFast: boolean;
  concurrency: number;
  debug: boolean;
}

export default function Tiny(
  app: SdkApp,
  suiteModules: any[],
  { grep, failFast = false, concurrency = 1, debug = false }: TinyOptions,
) {
  process.env.NODE_ENV = "test";

  const options = { grep, failFast, concurrency, debug };

  return {
    run: async (): Promise<RunnerResults> => {
      const staticConfig = await loadStaticConfig();
      const connectionFormDataProps = (staticConfig.methods && staticConfig.methods.connectionFormDataProps)
        ? staticConfig.methods.connectionFormDataProps
        : {};

      let transaction: TransactionPOJO = {
        id: v4(),
        isRetry: false,
        useSandbox: false,
        session: {},
      };

      logStep("calling the connect method to set the session");

      if (options.debug) {
        log("input:");
        logObject(transaction);
        logObject(connectionFormDataProps);
      }

      try {
        await app.connect!(transaction, connectionFormDataProps);
        logPass("connect successfully set the session");
        if (options.debug) {
          log("output:");
          logObject(transaction);
        }
      } catch (error) {
        logFail(error.message);
        return { failed: 1, passed: 0, skipped: 0 };
      }

      let suites = suiteModules.map(
        (suiteModule) => new suiteModule(app, transaction, { debug: options.debug, staticConfig }),
      ) as Suite[];

      if (options.grep) {
        suites = filterTests(options.grep, suites);
      }

      const negateTests = staticConfig.negateTests
        ? staticConfig.negateTests
        : [];

      return await new Runner(suites, {
        ...options,
        negateTests,
      }).run();
    },
  };
}

