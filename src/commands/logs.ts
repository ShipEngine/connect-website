import BaseCommand from "../base-command";
import { flags } from "@oclif/command";
import { loadApp } from "@shipengine/connect-loader";
import Login from './login';
import { ApiClientErrors } from '../core/api-client'
import chalk from 'chalk';

export default class Logs extends BaseCommand {
  public static description = "Get the logs for your app";

  static flags = {
    help: flags.help({
      char: "h",
      description: "Show help for the logs command",
    }),
    debug: flags.boolean({
      char: "d",
      description: "Show network debugging information",
      default: false,
      hidden: true
    }),
    lines: flags.string({
      char: "l",
      default: "1500",
      description: "The number of lines of logs to show from the server, max of 1500"
    }),
    raw: flags.boolean({
      char: "r",
      description: "Show logs in raw format",
      default: false
    })
  };

  async run(): Promise<void> {
    // When the -h flag is present the following line haults execution
    const { flags } = this.parse(Logs);

    // Verify user is logged in
    try {
      await this.getCurrentUser(flags.debug);
    } catch {
      await Login.run([])
    }

    try {
      const pathToApp = process.cwd();
      const app = await loadApp(pathToApp);

      const apiClient = await this.apiClient(flags.debug)

      const platformApp = await apiClient.apps.getByName(app.manifest.name);
      const paginatedDeployments = await apiClient.deployments.getAllForAppId(
        platformApp.id,
      );
      const latestDeployment = paginatedDeployments.items[0];

      const logs = await apiClient.deployments.getLogsById({ deployId: latestDeployment.deployId, appId: platformApp.id })

      if (!flags.raw) {
        const parsedLogs = parseLogs(logs, flags.lines);
        parsedLogs.map(log => this.log(log));
      }
      else {
        this.log(logs);
      }

    } catch (error) {
      switch (error.code) {
        case "ERR_APP_ERROR":
          return this.error("Error loading your app - please make sure you are in an app directory", {
            exit: 1,
          });
        case ApiClientErrors.NotFound:
          return this.error("This app has not been published yet", {
            exit: 1,
          });
        default:
          return this.error("Error retrieving app info", {
            exit: 1,
          });
      }
    }
  }
}

export function parseLogs(logs: string, lines = "1500"): string[] {

  // Strip tailing logs that are greater than the line parameter
  const splitLogs = logs.split("\n");
  const trimmedLogs = splitLogs.slice(splitLogs.length - Number(lines));

  const parsedLogs: string[] = [];

  for (const log of trimmedLogs) {
    try {
      const parsedLog = JSON.parse(log) as object;

      if (isDIPLog(parsedLog)) {
        parsedLogs.push(formatDIPLog(parsedLog));
      }
      else {
        parsedLogs.push(JSON.stringify(parsedLogs, undefined, 2));
      }

    } catch {
      parsedLogs.push(chalk.grey(log));
    }
  }

  return parsedLogs;
}

interface DIPLog {
  level: string;
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
  let formattedMessage = chalk.green(`${log.metadata.timestamp}`);
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