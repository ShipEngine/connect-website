/* eslint-disable @typescript-eslint/no-non-null-assertion */

import bodyParser from "body-parser";
import { Express, Request, Response, NextFunction } from "express";
import {
  CarrierApp,
  ConnectionApp,
  NewManifestPOJO,
  NewShipmentPOJO,
  OrderApp,
  PickupCancellationPOJO,
  PickupRequestPOJO,
  RateCriteriaPOJO,
  ShipmentCancellationPOJO,
  TrackingCriteriaPOJO,
} from "@shipengine/connect-sdk/lib/internal";
import { AppType } from "@shipengine/connect-sdk";
import { TransactionPOJO } from "@shipengine/connect-sdk/lib/internal";
import log from "./utils/logger";

type App = CarrierApp | OrderApp | ConnectionApp;

interface ConnectArgs {
  transaction: TransactionPOJO;
  connectionFormData: Record<string, unknown>;
}

interface CreateShipmentArgs {
  transaction: TransactionPOJO;
  shipment: NewShipmentPOJO;
}

interface CancelShipmentsArgs {
  transaction: TransactionPOJO;
  shipments: ShipmentCancellationPOJO[];
}

interface RateShipmentArgs {
  transaction: TransactionPOJO;
  shipment: RateCriteriaPOJO;
}

interface TrackShipmentArgs {
  transaction: TransactionPOJO;
  shipment: TrackingCriteriaPOJO;
}

interface CreateManifestArgs {
  transaction: TransactionPOJO;
  manifest: NewManifestPOJO;
}

interface SchedulePickupArgs {
  transaction: TransactionPOJO;
  pickup: PickupRequestPOJO;
}

interface CancelPickupsArgs {
  transaction: TransactionPOJO;
  pickups: PickupCancellationPOJO[];
}

interface SdkError {
  message: string;
  code: string;
  details?: string[];
  name: string;
  originalCode: string;
  stack: string;
}

function logRequest(req: Request, _res: Response, next: NextFunction) {
  log.info(`${req.method} ${req.url}`);
  log.body(req.body);
  next();
}

function buildImageUrl(pathToImage: string, port: number): string | undefined {
  const fileName = pathToImage.split("/").pop();

  if (fileName) {
    return `http://localhost:${port}/${fileName}`;
  }
}

function formatError(error: SdkError) {
  return {
    name: error.name,
    message: error.message,
    code: error.code,
    details: error.details || [],
    originalCode: error.originalCode,
    stack: error.stack,
  };
}

function buildCarrierAppApi(sdkApp: CarrierApp, server: Express) {
  sdkApp.createShipment && server.put("/create-shipment", createShipment);
  sdkApp.cancelShipments && server.put("/cancel-shipments", cancelShipments);
  sdkApp.rateShipment && server.put("/rate-shipment", rateShipment);
  sdkApp.trackShipment && server.put("/track-shipment", trackShipment);
  sdkApp.createManifest && server.put("/create-manifest", createManifest);
  sdkApp.schedulePickup && server.put("/schedule-pickup", schedulePickup);
  sdkApp.cancelPickups && server.put("/cancel-pickups", cancelPickups);

  async function createShipment(req: Request, res: Response) {
    try {
      const { transaction, shipment } = req.body as CreateShipmentArgs;
      const shipmentResponse = await sdkApp.createShipment!(transaction, shipment);
      return res.status(200).send({
        transaction,
        shipmentResponse,
      });
    } catch (error) {
      return res.status(400).send(formatError(error));
    }
  }

  async function cancelShipments(req: Request, res: Response) {
    try {
      const { transaction, shipments } = req.body as CancelShipmentsArgs;
      const outcomes = await sdkApp.cancelShipments!(transaction, shipments);
      return res.status(200).send({
        transaction,
        outcomes,
      });
    } catch (error) {
      return res.status(400).send(formatError(error));
    }
  }

  async function rateShipment(req: Request, res: Response) {
    try {
      const { transaction, shipment } = req.body as RateShipmentArgs;
      const rates = await sdkApp.rateShipment!(transaction, shipment);
      return res.status(200).send({
        transaction,
        rates,
      });
    } catch (error) {
      return res.status(400).send(formatError(error));
    }
  }

  async function trackShipment(req: Request, res: Response) {
    try {
      const { transaction, shipment } = req.body as TrackShipmentArgs;
      const trackingInfo = await sdkApp.trackShipment!(transaction, shipment);
      return res.status(200).send({
        transaction,
        trackingInfo,
      });
    } catch (error) {
      return res.status(400).send(formatError(error));
    }
  }

  async function createManifest(req: Request, res: Response) {
    try {
      const { transaction, manifest } = req.body as CreateManifestArgs;
      const manifestResponse = await sdkApp.createManifest!(transaction, manifest);
      return res.status(200).send({
        transaction,
        manifestResponse,
      });
    } catch (error) {
      return res.status(400).send(formatError(error));
    }
  }

  async function schedulePickup(req: Request, res: Response) {
    try {
      const { transaction, pickup } = req.body as SchedulePickupArgs;
      const pickupResponse = await sdkApp.schedulePickup!(transaction, pickup);
      return res.status(200).send({
        transaction,
        pickupResponse,
      });
    } catch (error) {
      return res.status(400).send(formatError(error));
    }
  }

  async function cancelPickups(req: Request, res: Response) {
    try {
      const { transaction, pickups } = req.body as CancelPickupsArgs;
      const pickupsResponse = await sdkApp.cancelPickups!(transaction, pickups);
      return res.status(200).send({
        transaction,
        pickupsResponse,
      });
    } catch (error) {
      return res.status(400).send(formatError(error));
    }
  }
}

// function buildOrderAppApi(sdkApp: OrderApp, server: Express) {
//   // TODO
// }

export default function buildAPI(sdkApp: App, server: Express, port: number): void {
  server.use(
    bodyParser.urlencoded({
      extended: false,
    }),
  );

  server.use(bodyParser.json());

  // We are intentionally not logging this request
  server.get("/", getApp);

  server.use(logRequest);

  sdkApp.connect && server.put("/connect", connect);

  if (sdkApp.type === AppType.Carrier)
    buildCarrierAppApi(sdkApp as CarrierApp, server);

  // if (sdkApp.type === AppType.Order)
  //   buildOrderAppApi(sdkApp as OrderApp, server);

  function getApp(_req: Request, res: Response) {
    const sdkAppWithLogos = {
      ...sdkApp,
      ...{
        logo: buildImageUrl(sdkApp.logo, port),
        icon: buildImageUrl(sdkApp.icon, port),
      },
    };
    return res.status(200).json(sdkAppWithLogos);
  }

  async function connect(req: Request, res: Response) {
    try {
      const { transaction, connectionFormData } = req.body as ConnectArgs;
      await sdkApp.connect!(transaction, connectionFormData);
      return res.status(200).send({
        transaction,
      });
    } catch (error) {
      return res.status(400).send(formatError(error));
    }
  }
}
