import { IRouter, Router, Request, Response, NextFunction } from 'express';
import {
  SalesOrdersExportRequest,
  AcknowledgeOrdersRequest,
  ShipmentNotificationRequest,
} from '@shipengine/connect-order-source-api';
import { OrderApp } from '@shipengine/connect-sdk/lib/internal';
import {
  dispatchSalesOrdersExport,
  dispatchAcknowledgeOrders,
  dispatchShipmentNotification,
} from '../mapping';

export function salesOrdersExport(req: Request, res: Response, next: NextFunction) {
  const body = req.body as SalesOrdersExportRequest;
  const app = req.app.locals.app as OrderApp;

  dispatchSalesOrdersExport(app, body)
    .then((response) => res.send(response))
    .catch((err) => {
      // TODO map this into an ECom error type
      next(err);
    });
}

export function acknowledgeOrders(req: Request, res: Response, next: NextFunction) {
  const body = req.body as AcknowledgeOrdersRequest;
  const app = req.app.locals.app as OrderApp;

  dispatchAcknowledgeOrders(app, body)
    .then((response) => res.send(response))
    .catch((err) => {
      // TODO map this into an ECom error type
      next(err);
    });
}

export function shipmentNotification(req: Request, res: Response, next: NextFunction) {
  const body = req.body as ShipmentNotificationRequest;
  const app = req.app.locals.app as OrderApp;

  dispatchShipmentNotification(app, body)
    .then((response) => res.send(response))
    .catch((err) => {
      // TODO map this into an ECom error type
      next(err);
    });
}

const router: IRouter = Router();

router.post('/acknowledge_orders', acknowledgeOrders);
router.post('/sales_orders_export', salesOrdersExport);
router.post('/shipment_notification', shipmentNotification);

export default router;
