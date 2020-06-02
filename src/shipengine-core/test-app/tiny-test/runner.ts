import chalk from "chalk";
import Suite from "./suite";
import Test from "./test";
import { log, indent, indentLines } from "./log-helpers";

interface RunnerOptions {
  failFast: boolean;
  concurrency: number;
  debug: boolean;
}

export interface RunnerResults {
  passed: number;
  skipped: number;
  failed: number;
}

const results: RunnerResults = {
  passed: 0,
  skipped: 0,
  failed: 0,
};

async function runTest(
  test: Test,
  failFast = false,
  debug = false,
): Promise<void> {
  if (failFast && results.failed > 0) return;

  if (test.skip) {
    results.skipped++;

    log(
      `${indent(2)}${chalk.bgWhite.black(" SKIP ")} ${chalk.gray(
        test.toString(),
      )}`,
    );
    return;
  }

  try {
    await test.fn();
    results.passed++;
    log(
      `${indent(2)}${chalk.bgGreen.black(" PASS ")} ${chalk.green(
        test.toString(),
      )}`,
    );
  } catch (error) {
    results.failed++;
    // This extra check is needed when test are running concurrently
    if (failFast && results.failed > 1) return;
    log(
      `${indent(2)}${chalk.bgRed.black(" FAIL ")} ${chalk.red(
        test.toString(),
      )}`,
    );
    if (debug) {
      log(indentLines(chalk.red(error.stack), 4));
      log(
        indent(4) + chalk.yellow(`re-run with --grep=${test.truncatedSha()}'`),
      );
    }
  }
}

function partitionTestSuite(suite: Test[], size: number) {
  const partitionedTestSuite = [];
  let index = 0;

  while (index < suite.length) {
    partitionedTestSuite.push(suite.slice(index, size + index));
    index += size;
  }
  return partitionedTestSuite;
}

export async function Runner(
  suites: Suite[],

  { failFast = false, concurrency = 1, debug = false }: RunnerOptions,
): Promise<RunnerResults> {
  for (let suite of suites) {
    const partitionedTestSuite = partitionTestSuite(
      suite._testCache,
      concurrency,
    );

    if (failFast && results.failed > 0) return results;

    log(indentLines(chalk.yellow(`suite ${suite.title}`), 0));

    for (let testBatch of partitionedTestSuite) {
      await Promise.all(
        testBatch.map((test) => runTest(test, failFast, debug)),
      );
    }
  }

  return results;
}
