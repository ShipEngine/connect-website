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

export async function Runner(
  suites: Suite[],

  { failFast = false, concurrency = 1, debug = false }: RunnerOptions,
): Promise<RunnerResults> {
  // Concurrency is not configurable at the moment
  if (concurrency !== 1) return results;

  for (let suite of suites) {
    if (failFast && results.failed > 0) return results;

    log(indentLines(chalk.yellow(`suite ${suite.title}`), 0));

    for (let test of suite._testCache) {
      await runTest(test, failFast, debug);
    }
  }

  return results;
}
