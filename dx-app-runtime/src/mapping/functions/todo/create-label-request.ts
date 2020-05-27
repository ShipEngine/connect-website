import { LabelSpecConfig, TransactionConfig } from "@shipengine/ipaas";
import { CreateLabelRequest } from "../capi/create-label-request";
import mapLabelFormat from '../label-format';
import mapSize from './label-layout';
import mapShipment from './shipment';
import mapTransactionConfig from '../transaction-config';

export default (request: CreateLabelRequest): [TransactionConfig, LabelSpecConfig] => {
  const labelSpec: LabelSpecConfig =  {
    format: mapLabelFormat(request.label_format),
    size: mapSize(request.label_layout),
    shipment: mapShipment(request)
  };
  const transaction = mapTransactionConfig(request);

  return [transaction, labelSpec];
};
