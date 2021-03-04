import serviceHandler from "../service-handler";
import { IRouter, Router } from "express";
const router: IRouter = Router();
import * as integration from "../integration";
import diagnostics from "./diagnostics";
import registry from "./loader-data";

router.use("/diagnostics", diagnostics);
router.use(registry);

router.post("/CreateManifest", (req, res, next) =>
  serviceHandler(integration.createManifest, req, res, next)
);
router.post(
  "/Track",
  async (req, res, next) =>
    await serviceHandler(integration.track, req, res, next)
);
router.post(
  "/Register",
  async (req, res, next) =>
    await serviceHandler(integration.register, req, res, next)
);
router.post(
  "/GetRates",
  async (req, res, next) =>
    await serviceHandler(integration.getRates, req, res, next)
);
router.post(
  "/CreateLabel",
  async (req, res, next) =>
    await serviceHandler(integration.createLabel, req, res, next)
);
router.post(
  "/VoidLabels",
  async (req, res, next) =>
    await serviceHandler(integration.voidLabels, req, res, next)
);
router.post(
  "/SchedulePickup",
  async (req, res, next) =>
    await serviceHandler(integration.schedulePickup, req, res, next)
);
router.post(
  "/CancelPickup",
  async (req, res, next) =>
    await serviceHandler(integration.cancelPickup, req, res, next)
);

export default router;
