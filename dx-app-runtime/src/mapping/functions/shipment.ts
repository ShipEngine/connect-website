import { GetRatesRequest } from '@ipaas/capi/requests';
import { mapAddressToAddressWithContactInfoPOJO } from './address';
import {
  NewShipmentPOJO,
  DocumentFormat,
  DocumentSize,
} from '@shipengine/integration-platform-sdk';
import { capiToDxNewPackagePOJO } from './package';

export const mapGetRatesRequestToNewShipmentPOJO = (
  request: GetRatesRequest
): NewShipmentPOJO => {
  return {
    deliveryService: {
      id: request.service_code || '',
    },
    shipFrom: mapAddressToAddressWithContactInfoPOJO(request.ship_from),
    shipTo: mapAddressToAddressWithContactInfoPOJO(request.ship_to),
    shipDateTime: new Date(request.ship_datetime),
    returns: {
      isReturn: request.is_return_label,
      rmaNumber: '', // TODO: RMA Number is added in 1.13
    },
    packages: request.packages.map((pckg) =>
      capiToDxNewPackagePOJO(
        pckg,
        request.customs,
        request.advanced_options,
        DocumentFormat.PDF,
        DocumentSize.Inches4x6
      )
    ),
  };
};
