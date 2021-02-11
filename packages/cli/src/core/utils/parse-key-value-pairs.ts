import {default as d} from "debug"

const debugLogger = d("parser");

export type KeyValuePair = {
  key: string,
  value: string;
}

export function tryParseTuple(arg: string): KeyValuePair | null {
  const tokens = arg.split("=");
  if (tokens.length !== 2) {
    debugLogger("arg is not in NAME=value format: %s", arg);
    return null;
  }
  if (!(tokens[0] && tokens[1])) {
    debugLogger("arg is not in NAME=value format. NAME and value must not be empty: %s", arg);
    return null;
  }
  return {
    key: tokens[0],
    value: tokens[1].replace(/"/g, ""),
  };
}

export function parseIndependentKeyValuePairs(args: string[]): KeyValuePair[] | null {
  if (!args || args.length === 0) {
    return null;
  }

  const sanitizedArgs = args.map(arg => arg.trim().replace(/"/g, ""));

  if (sanitizedArgs.length % 2 !== 0) {
    debugLogger("args.length is not an even number: %o", sanitizedArgs);
    throw new Error("Invalid number of arguments, each key must have a corresponding value");
  }

  const keyValuePairs: KeyValuePair[] = [];
  while (sanitizedArgs.length > 0) {
    keyValuePairs.push({
      key: (sanitizedArgs.shift() as string),
      value: (sanitizedArgs.shift() as string)
    })
  }

  return keyValuePairs;
}

export function parseKeyValuePairs(args: string[]): KeyValuePair[] {
  if (!args || args.length === 0) {
    return [];
  }

  const keyValuePairs: KeyValuePair[] = [];
  const independentArguments = args.filter(arg => {
    const kvp = tryParseTuple(arg);
    if (kvp) {
      keyValuePairs.push(kvp);
      return false;
    }
    return true;
  });

  const otherPairs = parseIndependentKeyValuePairs(independentArguments);
  if (otherPairs) {
    keyValuePairs.push(...otherPairs);
  }

  return keyValuePairs;

}
