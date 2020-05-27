import { LabelConfig, TransactionConfig } from "@shipengine/ipaas";
import { CreateLabelResponse } from "../capi/create-label-response";

export default (transaction: TransactionConfig, response: LabelConfig): CreateLabelResponse => {
  const createLabelResponse: CreateLabelResponse = {
    transaction_id: transaction.id,
    tracking_number: response.trackingNumber,
    label_download: {
      label_data: response.image.toString()
    },
    form_download: {
      label_data: response.forms ? response.forms[0].data.toString() : undefined
    }
  };
  return createLabelResponse;
}
