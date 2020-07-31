import { CreateLabelRequest } from '@ipaas/capi/requests';
import { mapAddressToAddressWithContactInfoPOJO } from './address';
import { NewShipmentPOJO } from '@shipengine/integration-platform-sdk';
import { capiToDxNewPackagePOJO } from './package';
import { mapCapiToDxDocumentFormat } from './document-format';
import { mapCapiToDxDocumentSize } from './document-size';

export const mapCreateLabelRequestToNewShipmentPOJO = (
  request: CreateLabelRequest
): NewShipmentPOJO => {
  return {
    deliveryService: {
      id: request.service_code || '',
    },
    shipFrom: mapAddressToAddressWithContactInfoPOJO(request.ship_from),
    shipTo: mapAddressToAddressWithContactInfoPOJO(request.ship_to),
    returnTo: request.ship_from_display
      ? mapAddressToAddressWithContactInfoPOJO(request.ship_from_display)
      : undefined,
    shipDateTime: new Date(request.ship_datetime),
    returns: {
      isReturn: request.is_return_label,
      rmaNumber: undefined, // TODO: This is added in 1.13
    },
    packages: request.packages.map((pckg) =>
      capiToDxNewPackagePOJO(
        pckg,
        request.customs,
        request.advanced_options,
        mapCapiToDxDocumentFormat(request.label_format),
        mapCapiToDxDocumentSize(request.label_layout)
      )
    ),
  };
};
