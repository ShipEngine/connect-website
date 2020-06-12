import chalk from "chalk";
import Suite from "./suite";
import Test from "./test";
import {
  indent,
  indentLines,
  log,
  logFail,
  logPass,
  logSkip,
  logStep,
} from "../../utils/log-helpers";

interface RunnerOptions {
  failFast: boolean;
  concurrency: number;
  debug: boolean;
  negateTests: string[];
}

export interface RunnerResults {
  passed: number;
  skipped: number;
  failed: number;
}

export class Runner {
  results: RunnerResults;
  private suites: Suite[];
  private options: RunnerOptions;

  constructor(
    suites: Suite[],
    {
      failFast = false,
      concurrency = 1,
      debug = false,
      negateTests = [],
    }: RunnerOptions,
  ) {
    this.suites = suites;
    this.options = { failFast, concurrency, debug, negateTests };
    this.results = {
      passed: 0,
      skipped: 0,
      failed: 0,
    };
  }

  async run() {
    for (let suite of this.suites) {
      const partitionedTestSuite = this.partitionTestSuite(
        suite._testCache,
        this.options.concurrency,
      );

      if (this.options.failFast && this.results.failed > 0) return this.results;

      logStep(`test ${suite.title}`);

      for (let testBatch of partitionedTestSuite) {
        await Promise.all(testBatch.map((test) => this.runTest(test)));
      }
    }

    return this.results;
  }

  private async runTest(test: Test): Promise<void> {
    if (this.options.failFast && this.results.failed > 0) return;

    if (test.skip) {
      this.results.skipped++;
      logSkip(test.toString());
      return;
    }

    if (this.shouldTestBeNegated(test)) {
      try {
        await test.fn();
        this.results.failed++;
        // This extra check is needed when test are running concurrently
        if (this.options.failFast && this.results.failed > 1) return;
        logFail(test.negatedToString());
      } catch (error) {
        this.results.passed++;
        logPass(test.negatedToString());
      }
    } else {
      try {
        await test.fn();
        this.results.passed++;
        logPass(test.toString());
      } catch (error) {
        this.results.failed++;
        // This extra check is needed when test are running concurrently
        if (this.options.failFast && this.results.failed > 1) return;
        logFail(test.toString());
        if (this.options.debug) {
          log(indentLines(chalk.red(error.stack), 4));
          log(
            indent(4) +
              chalk.yellow(`re-run with --grep=${test.truncatedSha()}'`),
          );
        }
      }
    }
  }

  private partitionTestSuite(suite: Test[], size: number) {
    const partitionedTestSuite = [];
    let index = 0;

    while (index < suite.length) {
      partitionedTestSuite.push(suite.slice(index, size + index));
      index += size;
    }
    return partitionedTestSuite;
  }

  private shouldTestBeNegated(test: Test) {
    return this.options.negateTests.some((sha) => test.sha.includes(sha));
  }
}
