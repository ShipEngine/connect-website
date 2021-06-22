import { IRouter, NextFunction, Request, Router, Response } from 'express';
import { session, setTransactionId } from '../util/storage';
import diagnostics from './diagnostics';
import docs from './docs';
import { App } from '../app';
import { NotImplementedError } from '..';
import { getImageRoutes } from './images';

export const executeImplementation = (implementation?: Function) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    await session.run({}, async () => {
      setTransactionId(req?.body?.transaction_id);
      try {
        if (!implementation) {
          throw new NotImplementedError();
        }
        const response = await implementation(req);
        res.status(200).send(response);
      } catch (exception) {
        next(exception);
      }
    });
  };
};

export const getRoutes = (app: App) => {
  const router: IRouter = Router();
  router.use('/diagnostics', diagnostics);
  router.use(docs(app));
  router.use(getImageRoutes(app.getImages()));
  router.get('/GetRegistryData', (req, res, next) => {
    res.status(200).send(app.data);
  });
  app.routes.forEach((route) => {
    router[route.method](route.path, executeImplementation(route.handler));
  });
  return router;
};
