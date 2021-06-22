import { OrderApp, Input, Output } from '@shipengine/connect-sdk/lib/internal';
import * as api from '@shipengine/connect-order-source-api';
import { mapTransaction } from '../transaction';
import { mapSalesOrder } from './output';
import { mapTimeRange } from './input';
import logger from '../../util/logger';

export function mapCursor(
  range: Input.SalesOrderTimeRange,
  paging: Output.SalesOrderPaging | undefined,
): string | undefined {
  if (!paging || !paging.cursor) {
    return;
  }

  const cursorData: Input.SalesOrderTimeRange = {
    ...range,
    paging,
  };

  return JSON.stringify(cursorData);
}

export async function dispatchSalesOrdersExport(
  app: OrderApp,
  body: api.SalesOrdersExportRequest,
): Promise<api.SalesOrdersExportResponse> {
  if (!app.getSalesOrdersByDate) {
    throw new Error('export not implemented');
  }

  const transaction = mapTransaction(body.transaction_id, body.auth);
  const range = mapTimeRange(body);

  logger.debug('Starting order export', { transaction, range });

  const orders = await app.getSalesOrdersByDate(transaction, range);

  const mappedOrders: api.SalesOrder[] = orders.salesOrders
    ? orders.salesOrders.map(mapSalesOrder)
    : [];
  const cursor = mapCursor(range, orders.paging);

  return {
    sales_orders: mappedOrders,
    cursor,
  };
}
