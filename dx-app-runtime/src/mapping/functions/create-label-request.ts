import { CreateLabelRequest } from '@ipaas/capi/requests';
import { NewShipmentPOJO } from '@shipengine/connect-sdk/lib/internal';
import {
  mapConfirmation,
  mapLabelLayout,
  mapLabelFormat,
  mapNewPackage,
  mapAddress
} from './'
import {  } from './label-format';

export const mapCreateLabelRequest = (
  request: CreateLabelRequest
): NewShipmentPOJO => {
  return {
    deliveryService: request.service_code || '',
    deliveryConfirmation: mapConfirmation(request.confirmation),
    shipFrom: mapAddress(request.ship_from),
    shipTo: mapAddress(request.ship_to),
    returnTo: request.ship_from_display
      ? mapAddress(request.ship_from_display)
      : undefined,
    shipDateTime: new Date(request.ship_datetime),
    returns: {
      isReturn: request.is_return_label,
      rmaNumber: undefined, // TODO: This is added in 1.13
    },
    packages: request.packages.map((pckg) =>
      mapNewPackage(
        pckg,
        request.customs,
        request.advanced_options,
        mapLabelFormat(request.label_format),
        mapLabelLayout(request.label_layout)
      )
    ),
  };
};
