import { GetRatesRequest } from '@ipaas/capi/requests';
import {
  DocumentFormat,
  DocumentSize,
} from '@shipengine/connect-sdk';
import {
  NewShipmentPOJO,
} from '@shipengine/connect-sdk/lib/internal';
import { 
  mapNewPackage,
  mapAddress
} from './';

export const mapGetRatesRequestToNewShipmentPOJO = (
  request: GetRatesRequest
): NewShipmentPOJO => {
  return {
    deliveryService: request.service_code || '',
    shipFrom: mapAddress(request.ship_from),
    shipTo: mapAddress(request.ship_to),
    shipDateTime: new Date(request.ship_datetime),
    returns: {
      isReturn: request.is_return_label,
      rmaNumber: '', // TODO: RMA Number is added in 1.13
    },
    packages: request.packages.map((pckg) =>
      mapNewPackage(
        pckg,
        request.customs || undefined,
        request.advanced_options,
        DocumentFormat.PDF, // TODO: TODO: This seems like it can be removed from the get rates request
        DocumentSize.Inches4x6, // TODO: This seems like it can be removed from the get rates request
        request.insurance_provider || undefined
      )
    ),
  };
};
