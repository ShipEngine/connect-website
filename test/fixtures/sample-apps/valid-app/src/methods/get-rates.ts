import { Currency, RateCriteria, RatePOJO, RateQuotePOJO, ShippingChargeType, Transaction } from "@shipengine/integration-platform-sdk";
import { codeToID, idToCode } from "../id-code-map";
import { apiClient } from "../mock-api/client";
import { QuoteRateResponseItem, QuoteRatesRequest, QuoteRatesResponse } from "../mock-api/quote-rates";

/**
 * Gets shipping rate quotes for the specified criteria
 */
export default async function getRates(
  transaction: Transaction, criteria: RateCriteria): Promise<RateQuotePOJO> {

  // STEP 1: Validation
  // TODO: add any validation logic here

  // STEP 2: Create the data that the carrier's API expects
  let data: QuoteRatesRequest = {
    operation: "quote_rates",
    session_id: transaction.session.id,
    service_codes: criteria.deliveryServices.map(({id}) => idToCode(id)),
    confirmation_codes: criteria.deliveryConfirmations.map(({id}) => idToCode(id)),
    parcel_codes: criteria.packaging.map(({id}) => idToCode(id)),
    ship_date: criteria.shipDateTime.toISOString(),
    delivery_date: criteria.deliveryDateTime.toISOString(),
    from_zone: parseInt(criteria.shipFrom.postalCode, 10),
    to_zone: parseInt(criteria.shipTo.postalCode, 10),
    total_weight: criteria.packages.reduce((w, pkg) => w + pkg.weight.ounces, 0),
  };

  // STEP 3: Call the carrier's API
  const response = await apiClient.request<QuoteRatesResponse>({ data });

  // STEP 4: Create the output data that ShipEngine expects
  return {
    rates: response.data.map(formatRate)
  };
}

/**
 * Formats a rate quote in the way ShipEngine expects
 */
function formatRate(rate: QuoteRateResponseItem): RatePOJO {
  return {
    deliveryServiceID: codeToID(rate.service_code),
    deliveryConfirmationID: codeToID(rate.confirmation_code),
    packagingID: codeToID(rate.parcel_code),
    shipDateTime: new Date(rate.ship_date),
    deliveryDateTime: new Date(rate.delivery_date),
    maximumDays: rate.delivery_days,
    isGuaranteed: true,
    isTrackable: true,
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
