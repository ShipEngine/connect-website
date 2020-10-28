import chalk from "chalk";

/**
 * Parse logs from DIP into a more human readable format.
 */
export function parseDIPLogs(logs: string, lines = "1500", showAll = false): string[] {

  // Strip tailing logs that are greater than the line parameter
  const splitLogs = logs.split("\n");
  const trimmedLogs = splitLogs.slice(splitLogs.length - Number(lines));

  const parsedLogs: string[] = [];

  for (const log of trimmedLogs) {
    try {
      // If not valid JSON object then output raw string data.
      const parsedLog = JSON.parse(log) as object;

      // Check for DIP specifc 
      if (isDIPLog(parsedLog)) {
        // Skip HTTP calls unless '-a' flag is specified
        if (!showAll && (isHTTPLog(parsedLog.metadata) || parsedLog.message.includes("HTTP"))) {
          continue;
        }
        parsedLogs.push(formatDIPLog(parsedLog));
      }
      else {
        parsedLogs.push(JSON.stringify(parsedLog));
      }
    } catch {
      parsedLogs.push(chalk.grey(log));
    }
  }

  return parsedLogs;
}

interface DIPLog {
  level: "info" | "warning" | "error";
  message: string;
  transactionId: string;
  metadata: {
    timestamp: string;
    meta?: Record<string, unknown>;
    [key: string]: unknown;
  };
}

function isDIPLog(obj: object): obj is DIPLog {
  return "level" in obj && "message" in obj;
}

interface MetadataHTTP {
  meta: {
    request: Record<string, unknown>;
    response: Record<string, unknown>
  }
}

function isHTTPLog(obj: { meta?: Record<string, unknown> }): obj is MetadataHTTP {
  if ("meta" in obj) {
    return "request" in obj.meta! && "response" in obj.meta!;
  }
  return false;
}

function formatDIPLog(log: DIPLog): string {

  let formattedMessage = "";
  switch (log.level) {
    case "info":
      formattedMessage = chalk.green(`${log.metadata.timestamp}`);
      break;
    case "warning":
      formattedMessage = chalk.yellow(`${log.metadata.timestamp}`);
      break;
    case "error":
      formattedMessage = chalk.red(`${log.metadata.timestamp}`);
      break;
    default:
      formattedMessage = chalk.green(`${log.metadata.timestamp}`);
  }

  const tid = log.transactionId;

  formattedMessage += `: message=${chalk.grey(log.message)}`;

  if (tid !== "no-txid" && tid !== undefined) {
    formattedMessage += ` transactionId=${tid}`;
  }

  if (isHTTPLog(log.metadata)) {
    formattedMessage += ` meta=${chalk.grey(JSON.stringify(log.metadata.meta))}`;
  }

  for (const key of Object.keys(log.metadata)) {
    if (!["meta", "timestamp"].includes(key) && typeof log.metadata[key] === "string") {
      formattedMessage += ` ${key}=${chalk.grey(log.metadata[key])}`;
    }
  }

  return formattedMessage;
}