import { ChargeType, Currency, RateCriteria, RatePOJO, Transaction } from "@shipengine/integration-platform-sdk";
import deliveryConfirmations from "../definitions/delivery-confirmations";
import deliveryServices from "../definitions/delivery-services";
import packaging from "../definitions/packaging";
import { apiClient } from "../mock-api/client";
import { QuoteRateResponseItem, QuoteRatesRequest, QuoteRatesResponse } from "../mock-api/quote-rates";
import { Session } from "./session";

/**
 * Generates shipping rates for a shipment
 */
export default async function rateShipment(
  transaction: Transaction<Session>, shipment: RateCriteria): Promise<RatePOJO[]> {

  // STEP 1: Validation
  // TODO: add any validation logic here

  // STEP 2: Create the data that the carrier's API expects
  let data: QuoteRatesRequest = {
    operation: "quote_rates",
    session_id: transaction.session.id,
    service_codes: shipment.deliveryService.identifiers.apiCode,
    confirmation_codes: shipment.packages[0].deliveryConfirmations.map((conf) => conf.identifiers.apiCode),
    parcel_codes: shipment.packages[0].packaging.map((pkg) => pkg.identifiers.apiCode),
    ship_date: shipment.shipDateTime.toISOString(),
    delivery_date: shipment.deliveryDateTime.toISOString(),
    from_zone: parseInt(shipment.shipFrom.postalCode, 10),
    to_zone: parseInt(shipment.shipTo.postalCode, 10),
    total_weight: shipment.packages[0].weight.ounces,
  };

  // STEP 3: Call the carrier's API
  const response = await apiClient.request<QuoteRatesResponse>({ data });

  // STEP 4: Create the output data that ShipEngine expects
  return response.data.map(formatRate);
}

/**
 * Formats a rate quote in the way ShipEngine expects
 */
function formatRate(rate: QuoteRateResponseItem): RatePOJO {
  return {
    deliveryService: deliveryServices.find((svc) => svc.identifiers.apiCode === rate.service_code),
    shipDateTime: new Date(rate.ship_date),
    deliveryDateTime: new Date(rate.delivery_date),
    isTrackable: true,
    packages: [{
      packaging: packaging.find((pkg) => pkg.identifiers.apiCode === rate.parcel_code),
      deliveryConfirmation: deliveryConfirmations.find((conf) => conf.identifiers.apiCode === rate.confirmation_code),
    }],
    charges: [
      {
        name: "Service Charge",
        type: ChargeType.Shipping,
        amount: {
          value: rate.shipment_cost,
          currency: Currency.UnitedStatesDollar,
        }
      },
      {
        name: "Confirmation Fee",
        type: ChargeType.DeliveryConfirmation,
        amount: {
          value: rate.confirmation_cost,
          currency: Currency.UnitedStatesDollar,
        }
      },
      {
        name: "Transport Tax",
        type: ChargeType.Tax,
        amount: {
          value: rate.tax_cost,
          currency: Currency.UnitedStatesDollar,
        }
      },
    ],
  };
}
