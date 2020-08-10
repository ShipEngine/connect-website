import bodyParser from "body-parser";
import { Express, Request, Response, NextFunction } from "express";
import { CarrierApp } from "@shipengine/integration-platform-sdk/lib/internal";
import log from "./utils/logger";

export default function buildAPI(sdkApp: CarrierApp, server: Express) {
  server.use(
    bodyParser.urlencoded({
      extended: false,
    }),
  );
  server.use(bodyParser.json());
  server.use(logRequest);

  server.get("/", getApp);

  sdkApp.connect && server.put("/connect", connect);
  sdkApp.createShipment && server.put("/create-shipment", createShipment);
  sdkApp.cancelShipments && server.put("/cancel-shipments", cancelShipments);
  sdkApp.rateShipment && server.put("/rate-shipment", rateShipment);
  sdkApp.trackShipment && server.put("/track-shipment", trackShipment);
  sdkApp.createManifest && server.put("/create-manifest", createManifest);
  sdkApp.schedulePickup && server.put("/schedule-pickup", schedulePickup);
  sdkApp.cancelPickups && server.put("/cancel-pickups", cancelPickups);

  function getApp(_req: Request, res: Response) {
    return res.status(200).json(sdkApp);
  }

  async function connect(req: Request, res: Response) {
    try {
      const { transaction, connectionFormData } = req.body;
      await sdkApp.connect!(transaction, connectionFormData);
      return res.status(200).send({
        transaction,
      });
    } catch (error) {
      return res.status(400).send(error);
    }
  }

  async function createShipment(req: Request, res: Response) {
    try {
      let { transaction, shipment } = req.body;
      shipment = await sdkApp.createShipment!(transaction, shipment);
      return res.status(200).send({
        transaction,
        shipment,
      });
    } catch (error) {
      return res.status(400).send(error);
    }
  }

  async function cancelShipments(req: Request, res: Response) {
    try {
      const { transaction, shipments } = req.body;
      const outcomes = await sdkApp.cancelShipments!(transaction, shipments);
      return res.status(200).send({
        transaction,
        outcomes,
      });
    } catch (error) {
      return res.status(400).send(error);
    }
  }

  async function rateShipment(req: Request, res: Response) {
    try {
      const { transaction, shipment } = req.body;
      const rates = await sdkApp.rateShipment!(transaction, shipment);
      return res.status(200).send({
        transaction,
        rates,
      });
    } catch (error) {
      return res.status(400).send(error);
    }
  }

  async function trackShipment(req: Request, res: Response) {
    try {
      const { transaction, shipment } = req.body;
      const trackingInfo = await sdkApp.trackShipment!(transaction, shipment);
      return res.status(200).send({
        transaction,
        trackingInfo,
      });
    } catch (error) {
      return res.status(400).send(error);
    }
  }

  async function createManifest(req: Request, res: Response) {
    try {
      let { transaction, manifest } = req.body;
      manifest = await sdkApp.createManifest!(transaction, manifest);
      return res.status(200).send({
        transaction,
        manifest,
      });
    } catch (error) {
      return res.status(400).send(error);
    }
  }

  async function schedulePickup(req: Request, res: Response) {
    try {
      let { transaction, pickup } = req.body;
      pickup = await sdkApp.schedulePickup!(transaction, pickup);
      return res.status(200).send({
        transaction,
        pickup,
      });
    } catch (error) {
      return res.status(400).send(error);
    }
  }

  async function cancelPickups(req: Request, res: Response) {
    try {
      let { transaction, pickups } = req.body;
      pickups = await sdkApp.cancelPickups!(transaction, pickups);
      return res.status(200).send({
        transaction,
        pickups,
      });
    } catch (error) {
      return res.status(400).send(error);
    }
  }

  function logRequest(req: Request, _res: Response, next: NextFunction) {
    log(`${req.method} ${req.url}`);
    log(req.body);
    next();
  }
}
