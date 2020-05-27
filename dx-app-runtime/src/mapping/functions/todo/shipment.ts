import { GetRatesRequest } from "../../capi/get-rates-request";
import { CreateLabelRequest } from "../../capi/create-label-request";
import { capiToDxAddress } from "../address";
import { BilledParty, Country } from "@shipengine/integration-platform-sdk";
import {capiToDxPackage} from "../package";
import mapInsuranceProvider from './insurance-provider';

export default (request: GetRatesRequest | CreateLabelRequest) => {
  return {
    deliveryServiceID: request.service_code || '',
    shipFrom: capiToDxAddress(request.ship_from),
    shipTo: capiToDxAddress(request.ship_to),
    shipDateTime: new Date(request.ship_datetime),
//    nonDeliveryAction: NonDeliveryAction.ReturnToSender, //TODO: how to map nonDeliveryAction?
    insuranceProvider: mapInsuranceProvider(request.insurance_provider),
    isReturn: request.is_return_label,
    billing: {
      dutiesPaidBy: BilledParty.Sender,
      deliveryPaidBy: BilledParty.Sender,
      account: 'I dont know where this would come from',
      postalCode: '?',
      country: Country.UnitedStates,
    },
    packages: request.packages.map(pckg => capiToDxPackage(pckg, request.customs, request.advanced_options))
  }
};
