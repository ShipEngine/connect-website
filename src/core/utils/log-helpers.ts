import chalk from "chalk";

function log(logLine: string): void {
  // eslint-disable-next-line no-console
  console.log(logLine);
}

function repeat(str: string, n: number): string {
  return new Array(n).join(str);
}

function indent(n: number): string {
  return repeat("    ", n);
}

function indentLines(str: string, n: number): string {
  return indent(n) + str.replace(/\n/g, `\n${indent(n)}`);
}

function logPass(logLine: string): void {
  log(`${indent(2)}${chalk.bgGreen.black(" PASS ")} ${chalk.green(logLine)}`);
}

function logFail(logLine: string, withTag = true): void {
  if (withTag) {
    log(`${indent(2)}${chalk.bgRed.black(" FAIL ")} ${chalk.red(logLine)}`);
  } else {
    log(`${indent(2)}${chalk.red(logLine)}`);
  }
}

function logSkip(logLine: string): void {
  log(`${indent(2)}${chalk.bgWhite.black(" SKIP ")} ${chalk.gray(logLine)}`);
}

function logSkipStep(logLine: string): void {
  log(chalk.white(logLine));
}

function logStep(logLine: string): void {
  log(chalk.yellow(logLine));
}

function logObject(obj: object): void {
  /* eslint-disable no-console */
  // console.dir(obj, { depth: null });
  const jsonString = JSON.stringify([obj], null, 4).replace("[", "");

  console.log(
    jsonString.substring(0, jsonString.lastIndexOf("]")) +
      "" +
      jsonString.substring(jsonString.lastIndexOf("]") + 1),
  );
}

function logResults(results: {
  failed: number;
  passed: number;
  skipped: number;
}): void {
  log(
    `${chalk.green(results.passed + " passing")} , ${chalk.red(
      results.failed + " failing",
    )}, ${results.skipped + " skipped"}`,
  );
}

export {
  indent,
  indentLines,
  log,
  logFail,
  logObject,
  logPass,
  logResults,
  logSkip,
  logSkipStep,
  logStep,
};
