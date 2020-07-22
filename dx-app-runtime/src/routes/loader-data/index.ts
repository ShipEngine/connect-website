import { IRouter, Router } from 'express';

const router: IRouter = Router();

import spec from '../../mapping/registry-data';

router.get('/GetRegistryData', (req, res) => {
  const externalSpec = spec(req.app.locals.app);
  res.send(externalSpec);
});

router.get('/app', (req, res) => {
  res.send(req.app.locals.app);
});

router.get('/manifest', (req, res) => {
  const app = req.app.locals.app;
  res.send(app.manifest);
});

router.get('/appinfo', (req, res) => {
  const app = req.app.locals.app;
  const { name, description, version } = app.manifest;
  return res.json({
    packageName: name,
    description,
    version,
  });
});

export default router;
