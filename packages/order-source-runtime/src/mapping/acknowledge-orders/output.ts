import { Output } from '@shipengine/connect-sdk/lib/internal';
import * as api from '@shipengine/connect-order-source-api';

export function mapAcknowledgementResponse(
  ack: Output.AcknowledgedSalesOrder,
): api.OrderAcknowledgementResponse {
  return {
    order_id: ack.id,
    succeeded: ack.succeeded,
    failure_reason: ack.failureReason,
  };
}
