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

export { log, repeat, indent, indentLines };
