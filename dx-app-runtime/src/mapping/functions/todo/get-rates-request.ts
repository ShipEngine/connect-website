import { GetRatesRequest } from "../capi/get-rates-request";
import { RateCriteriaConfig, TransactionConfig } from "@shipengine/ipaas";
import mapShipment from './shipment';
import mapTransactionConfig from '../transaction-config';

export default (request: GetRatesRequest): [TransactionConfig, RateCriteriaConfig] => {
  const rateCriteria: RateCriteriaConfig = {
    shipment: mapShipment(request)
  };
  const transaction = mapTransactionConfig(request);

  return [transaction, rateCriteria];
}
