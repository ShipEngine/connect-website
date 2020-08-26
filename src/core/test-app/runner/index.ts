import chalk from "chalk";
import escapeStringRegexp from "escape-string-regexp";
import Suite from "./suite";
import Test from "./test";
import { TestResults, TestReducer } from "./test-results";
import {
  indentLines,
  log,
  logFail,
  logObject,
  logPass,
  logSkip,
  logStep,
} from "../../utils/log-helpers";
import callWithTimeoutAndRetries from "./call-with-timeout-and-retries";

interface RunnerArgs {
  failFast: boolean;
  grep?: string;
  suites: Suite[];
  testResults: TestResults;
  testResultsReducer: TestReducer;
}

export default class Runner {
  private failFast: boolean;
  
  private grep?: string;
  
  private suites: Suite[];
  
  private testResults: TestResults;
  
  private testResultsReducer: TestReducer;

  constructor({
    failFast,
    grep,
    suites,
    testResults,
    testResultsReducer,
  }: RunnerArgs) {
    this.failFast = failFast;
    this.grep = grep;
    this.suites = suites;
    this.testResults = testResults;
    this.testResultsReducer = testResultsReducer;
  }

  async run(): Promise<TestResults> {
    for (const suite of this.suites) {
      if (this.failFast && this.testResults.hasFailed())
        return this.testResults;

      if (suite.tests().length === 0) {
        // If a suite doesn't have any test continue to the next suite in the array
        continue;
      }

      logStep(suite.title);

      for (const test of suite.tests()) {
        if (this.failFast && this.testResults.hasFailed()) continue;

        if (this.grep) {
          // TODO if we allow regexs to be set in the connect.config.js we need to check to see if this a string or not here
          const cleanGrep = escapeStringRegexp(this.grep);

          // extract args if it's regex-like, i.e: [string, pattern, flag]
          const regex = new RegExp(/^\/(.*)\/(g|i|)$|.*/);
          const arg = regex.exec(cleanGrep);
          const grep = new RegExp(arg![1] || arg![0], arg![2]);

          const suiteTitleMatch = grep.test(suite.title);
          if (!grep.test(test.title) && !suiteTitleMatch) continue;
        }

        if (test.skip) {
          this.testResultsReducer("INCREMENT_SKIPPED");
          logSkip(test.title);
          continue;
        }

        await this.runTest(test);
      }
    }

    return this.testResults;
  }

  async runTest(test: Test): Promise<void> {
    try {
      await callWithTimeoutAndRetries(test.fn, test.timeout, test.retries);
      this.testResultsReducer("INCREMENT_PASSED");
      logPass(test.title);
    } catch (error) {
      const err = error as Error;
      if (
        test.expectedErrorMessage &&
        err.message &&
        err.message.includes(test.expectedErrorMessage)
      ) {
        this.testResultsReducer("INCREMENT_PASSED");
        logPass(test.title);
      } else {
        this.testResultsReducer("INCREMENT_FAILED");
        logFail(test.title);
        log(indentLines(chalk.red(err.stack), 4));
      }
    } finally {
      if (test.debug) {
        logObject(test.methodArgs);
      }
    }
  }
}
