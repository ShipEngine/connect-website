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

  async run() {
    for (let suite of this.suites) {
      if (this.failFast && this.testResults.hasFailed())
        return this.testResults;

      if (suite.tests().length === 0) {
        // If a suite doesn't have any test continue to the next suite in the array
        // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Loops_and_iteration#continue_statement
        continue;
      }

      // TODO - apply grep logic here
      // Algo - check to see if suite.title matches if true, run all test
      //        else check each test title
      logStep(suite.title);

      for (let test of suite.tests()) {
        await this.runTest(test);
      }
    }

    return this.testResults;
  }

  async runTest(test: Test) {
    if (this.failFast && this.testResults.hasFailed()) return;

    if (this.grep) {
      const cleanGrep = escapeStringRegexp(this.grep);

      // extract args if it's regex-like, i.e: [string, pattern, flag]
      const arg = cleanGrep.match(/^\/(.*)\/(g|i|)$|.*/);
      const grep = new RegExp(arg![1] || arg![0], arg![2]);

      if (!grep.test(test.title)) return;
    }

    if (test.skip) {
      this.testResultsReducer("INCREMENT_SKIPPED");
      logSkip(test.title);
      return;
    }

    try {
      // const retries = 0;
      // TODO - handle retry and timeout logic here
      // test.retries
      // test.timeout
      await test.fn();
      this.testResultsReducer("INCREMENT_PASSED");
      logPass(test.title);
    } catch (error) {
      if (
        test.expectedErrorMessage &&
        error.message &&
        error.message.includes(test.expectedErrorMessage)
      ) {
        this.testResultsReducer("INCREMENT_PASSED");
        logPass(test.title);
      } else {
        this.testResultsReducer("INCREMENT_FAILED");
        logFail(test.title);
        log(indentLines(chalk.red(error.stack), 4));
      }
    } finally {
      if (test.debug) {
        // TODO - format w/ 4 space indentation
        logObject(test.methodArgs);
      }
    }
  }
}
