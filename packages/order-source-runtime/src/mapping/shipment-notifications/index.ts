import { OrderApp } from "@shipengine/connect-sdk/lib/internal";
import * as api from "@shipengine/connect-order-source-api";
import { mapTransaction } from "../transaction";
import { mapNotification } from "./input";
import logger from "../../util/logger";

export async function dispatchShipmentNotification(
  app: OrderApp,
  body: api.ShipmentNotificationRequest
): Promise<api.ShipmentNotificationResponse> {
  if (!app.shipmentCreated) {
    throw new Error("notify not implemented");
  }

  const transaction = mapTransaction(body.transaction_id, body.auth);

  const results: api.ShipmentNotificationResult[] = [];

  for (const notification of body.notifications) {
    const shipment = mapNotification(notification);

    logger.debug("Starting shipment notification", { transaction, shipment });

    /*
     * TODO:
     * This call should be wrapped in a try/catch because, as currently written,
     * this code will fail the entire request when one notification failes, rather
     * than send a 207 with partial successes to the caller.
     */
    await app.shipmentCreated(transaction, shipment);

    results.push({
      notification_id: notification.notification_id,
      succeeded: true,
      failure_reason: undefined,
      confirmation_code: undefined,
    });
  }

  return {
    notification_results: results,
  };
}
