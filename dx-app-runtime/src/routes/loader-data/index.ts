import { IRouter, Router } from "express";

const router: IRouter = Router();

import spec from "../../mapping/registry-data";
import logger from "../../util/logger";

router.get("/GetRegistryData", (req, res) => {
  try {
    const externalSpec = spec(req.app.locals.app);
    res.send(externalSpec);
  } catch(error) {
    logger.error('There was an error while trying to map to the external spec.');
    logger.error(error.message);
    logger.error(error.stack);
    res.status(500).send(error);
  }
});

router.get("/app", (req, res) => {
  res.send(req.app.locals.app);
});

router.get("/manifest", (req, res) => {
  const app = req.app.locals.app;
  res.send(app.manifest);
});

router.get("/appinfo", (req, res) => {
  const app = req.app.locals.app;
  const { name, description, version } = app.manifest;
  return res.json({
    packageName: name,
    description,
    version,
  });
});

export default router;
