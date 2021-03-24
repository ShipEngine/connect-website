import {
  TransactionPOJO,
  ShipmentConfirmation,
} from "@shipengine/connect-sdk/lib/internal";
import { CreateLabelResponse } from "@shipengine/connect-carrier-api/lib/responses";
import {
  mapDateTime,
  getTotalCosts,
  everythingButInsuranceFilter,
  insuranceChargeFilter,
  getLabelPackage,
} from ".";

export const mapCreateLabelResponse = (
  transaction: TransactionPOJO,
  response: ShipmentConfirmation
): CreateLabelResponse => {
  const shippingCost = getTotalCosts(
    response.charges.filter(everythingButInsuranceFilter)
  );
  const insuranceCost = getTotalCosts(
    response.charges.filter(insuranceChargeFilter)
  );

  const createLabelResponse: CreateLabelResponse = {
    transaction_id: transaction.id,
    tracking_number: response.trackingNumber,
    label_download: {
      data: response.label.data.toString("base64"),
    },
    shipping_amount: shippingCost,
    insurance_amount: insuranceCost,
    estimated_delivery_datetime: mapDateTime(response.deliveryDateTime),
    carrier_transaction_id: response.identifiers?.carrierTransactionId,
    packages: response.packages?.map(getLabelPackage),
  };
  if (response.form?.data) {
    createLabelResponse.form_download = {
      data: response.form.data.toString("base64"),
    };
  }
  return createLabelResponse;
};
