import express from "express";
import cors from "cors";
import { loadApp } from "@shipengine/connect-loader";
import { Request, Response } from "express";
import buildAPI from "./build-api";
import log from "./utils/logger";
import { SdkApp } from "./types";
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

  server.get("/app-status", (_req, res) => {
    res.status(200).send(appState);
  });

  let startMessage = "";
  let sdkApp: SdkApp;

  try {
    sdkApp = (await loadApp(pathToApp)) as unknown as SdkApp;

    buildAPI(pathToApp, sdkApp, server, port);
    server.use(express.static(pathToApp, { cacheControl: false }));

    startMessage = `${sdkApp.name} is now running at http://localhost:${port}`;
  } catch (error) {
    const err = error as Error;
    appState.status = "down";
    appState.error = err;
    startMessage =
      "App failed to load! Please fix the validation issues above.";
    log.error(err.message);
  }

  server.use(function (req: Request, res: Response) {
    const errorMessage = sdkApp
      ? `${sdkApp.name} does not implement ${req.path}`
      : `Endpoint ${req.path} not found`;
    res.status(404).send({ message: errorMessage });
  });

  server.listen(port, () => {
    if (appState.status === "up") {
      log.success(startMessage);
    } else {
      log.warn(startMessage);
    }
  });
}
