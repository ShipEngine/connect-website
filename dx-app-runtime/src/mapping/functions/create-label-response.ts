import {
  TransactionPOJO,
  ShipmentConfirmation,
} from '@shipengine/connect-sdk/lib/internal';
import { CreateLabelResponse } from '@ipaas/capi/responses';
import { mapDateTime, getTotalCosts, everythingButInsuranceFilter, insuranceChargeFilter } from '.';





export const mapCreateLabelResponse = (
  transaction: TransactionPOJO,
  response: ShipmentConfirmation
): CreateLabelResponse => {
  const shippingCost = getTotalCosts(response.charges.filter(everythingButInsuranceFilter));
  const insuranceCost = getTotalCosts(response.charges.filter(insuranceChargeFilter));

  const createLabelResponse: CreateLabelResponse = {
    transaction_id: transaction.id,
    tracking_number: response.trackingNumber,
    label_download: {
      label_data: response.label.data.toString('base64'),
    },
    shipping_amount: shippingCost,
    insurance_amount: insuranceCost,
    estimated_delivery_datetime: mapDateTime(response.deliveryDateTime),
  };
  if(response.form?.data) {
    createLabelResponse.form_download = {
      label_data: response.form.data.toString('base64'),
    }
  }
  return createLabelResponse;
};
