import { getNamespace } from "continuation-local-storage";
import { IRouter, NextFunction, Request, Router, Response } from "express";
import { setTransactionId, SESSION_ID } from "../util/storage";
import diagnostics from "./diagnostics";
import docs from "./docs";
import { App } from "../app";
import { NotImplementedError } from "..";

export const executeImplementation = (implementation?: Function) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const session = getNamespace(SESSION_ID);
    session?.run(async () => {
      setTransactionId(req?.body?.transaction_id);
      try {
        if (!implementation) {
          throw new NotImplementedError();
        }
        const response = await implementation(req.body);
        res.status(200).send(response);
      } catch (exception) {
        next(exception);
      }
    });
  };
};

export const getRoutes = (app: App) => {
  const router: IRouter = Router();
  router.use("/diagnostics", diagnostics);
  router.use("/docs", docs(app));
  router.get("/logo", (req, res) => {
    res.sendFile(app.logo);
  });
  router.get("/icon", (req, res) => {
    res.sendFile(app.icon);
  });
  router.get("/GetRegistryData", (req, res, next) => {
    res.status(200).send(app.data);
  });
  app.routes.forEach((route) => {
    router[route.method](route.path, executeImplementation(route.handler));
  });
  return router;
};
