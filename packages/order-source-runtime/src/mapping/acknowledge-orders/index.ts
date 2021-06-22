import { OrderApp } from '@shipengine/connect-sdk/lib/internal';
import * as api from '@shipengine/connect-order-source-api';
import { mapTransaction } from '../transaction';
import { mapAcknowledgement } from './input';
import { mapAcknowledgementResponse } from './output';
import logger from '../../util/logger';

export function defaultAck(order: api.OrderAcknowledgement): api.OrderAcknowledgementResponse {
  return {
    order_id: order.order_id,
    succeeded: true,
  };
}

export async function dispatchAcknowledgeOrders(
  app: OrderApp,
  body: api.AcknowledgeOrdersRequest,
): Promise<api.AcknowledgeOrdersResponse> {
  if (!app.acknowledgeOrders) {
    // Acknowledgement succeeds by default
    logger.debug('Auto acking order');
    return {
      responses: body.orders.map(defaultAck),
    };
  }

  const transaction = mapTransaction(body.transaction_id, body.auth);
  const ack = body.orders.map(mapAcknowledgement);

  logger.debug('Starting order acknowldegement', { transaction, ack });

  const res = await app.acknowledgeOrders(transaction, ack);

  return {
    responses: res.map(mapAcknowledgementResponse),
  };
}
