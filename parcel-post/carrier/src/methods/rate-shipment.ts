import { Currency, RateCriteria, RatePOJO, ShippingChargeType, Transaction } from "@shipengine/integration-platform-sdk";
import { codeToID, idToCode } from "../id-code-map";
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
    service_codes: shipment.deliveryServices.map(({id}) => idToCode(id)),
    confirmation_codes: shipment.deliveryConfirmations.map(({id}) => idToCode(id)),
    parcel_codes: shipment.packages.reduce((codes, pkg) =>
      codes.concat(pkg.packaging.map(({id}) => idToCode(id))), []),
    ship_date: shipment.shipDateTime.toISOString(),
    delivery_date: shipment.deliveryDateTime.toISOString(),
    from_zone: parseInt(shipment.shipFrom.postalCode, 10),
    to_zone: parseInt(shipment.shipTo.postalCode, 10),
    total_weight: shipment.packages.reduce((w, pkg) => w + pkg.weight.ounces, 0),
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
    deliveryServiceID: codeToID(rate.service_code),
    deliveryConfirmationID: codeToID(rate.confirmation_code),
    shipDateTime: new Date(rate.ship_date),
    deliveryDateTime: new Date(rate.delivery_date),
    maximumDeliveryDays: rate.delivery_days,
    isGuaranteed: true,
    isTrackable: true,
    packages: [
      {
        packagingID: codeToID(rate.parcel_code),
      }
    ],
    charges: [
      {
        name: "Service Charge",
        type: ShippingChargeType.Shipping,
        code: "SC1",
        amount: {
          value: rate.shipment_cost,
          currency: Currency.UnitedStatesDollar,
        }
      },
      {
        name: "Confirmation Fee",
        type: ShippingChargeType.DeliveryConfirmation,
        code: "CONF",
        amount: {
          value: rate.confirmation_cost,
          currency: Currency.UnitedStatesDollar,
        }
      },
      {
        name: "Transport Tax",
        type: ShippingChargeType.Tax,
        code: "TX7",
        amount: {
          value: rate.tax_cost,
          currency: Currency.UnitedStatesDollar,
        }
      },
    ],
  };
}
