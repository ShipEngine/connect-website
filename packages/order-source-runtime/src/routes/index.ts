import { IRouter, Router } from 'express';
import { resolve } from 'path';
import redoc from 'redoc-express';
import diagnostics from './diagnostics';
import loaderData from './loader-data';
import orderSourceAPI from './order-source-api';

const router: IRouter = Router();

router.get('/docs/spec.yaml', (req, res) => {
  res.sendFile(resolve(__dirname, '../mapping/spec.yaml'));
});

router.get(
  '/docs',
  redoc({
    title: 'Order Source API Docs',
    specUrl: '/docs/spec.yaml',
  }),
);

router.use('/diagnostics', diagnostics);
router.use(loaderData);
router.use(orderSourceAPI);

export default router;
