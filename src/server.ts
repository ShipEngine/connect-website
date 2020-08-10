import express from "express";
import cors from "cors";
import { loadApp } from "@shipengine/integration-platform-loader";
import { CarrierApp } from "@shipengine/integration-platform-sdk/lib/internal";
import { Request, Response, NextFunction } from "express";
import chalk from "chalk";
import buildAPI from "./build-api";
import log from "./utils/logger";

export default async function server(
  port: number,
  pathToApp: string,
): Promise<void> {
  const server = express();

  server.use(cors());

  const appState: { status: "up" | "down"; error: null | Error } = {
    status: "up",
    error: null,
  };

  let startMessage = "";
  let sdkApp: CarrierApp;

  try {
    sdkApp = (await loadApp(pathToApp)) as CarrierApp;
    buildAPI(sdkApp, server);
    startMessage = chalk.green(
      `${sdkApp.name} is now running at http://localhost:${port}`,
    );
  } catch (error) {
    appState.status = "down";
    appState.error = error;
    startMessage = chalk.yellow("app failed to load");
    log(chalk.red(error.stack));
  }

  server.get("/app-status", (_req, res) => {
    res.status(200).send(appState);
  });

  server.use(function (req: Request, res: Response, _next: NextFunction) {
    const errorMessage = sdkApp
      ? `${sdkApp.name} does not implement ${req.path}`
      : `Endpoint ${req.path} not found`;
    res.status(404).send({ message: errorMessage });
  });

  server.listen(port, () => log(startMessage));
}
