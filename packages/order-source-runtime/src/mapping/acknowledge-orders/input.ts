import { Input } from '@shipengine/connect-sdk/lib/internal';
import * as api from '@shipengine/connect-order-source-api';

export function mapAcknowledgement(
  ack: api.OrderAcknowledgement,
): Input.SalesOrderNotificationPOJO {
  return {
    id: ack.order_id,
    // TODO Why is this required by the SDK?
    orderNumber: ack.order_number!,
    importedDate: ack.imported_date,
    // TODO What is this meant to hold?
    identifiers: {},
  };
}
