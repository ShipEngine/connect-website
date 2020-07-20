import { GetRatesRequest } from "@ipaas/capi/requests";
import { mapAddressToAddressWithContactInfoPOJO } from "./address";
import { NewShipmentPOJO, DocumentFormat, DocumentSize } from "@shipengine/integration-platform-sdk";
import { capiToDxNewPackagePOJO } from "./package";

export const mapGetRatesRequestToNewShipmentPOJO = (
  request: GetRatesRequest
): NewShipmentPOJO => {
  return {
    deliveryService: {
      id: request.service_code || "",
    },
    shipFrom: mapAddressToAddressWithContactInfoPOJO(request.ship_from),
    shipTo: mapAddressToAddressWithContactInfoPOJO(request.ship_to),
    shipDateTime: new Date(request.ship_datetime),
    returns: {
      isReturn: request.is_return_label,
      rmaNumber: "", // TODO: RMA Number is added in 1.13
      outboundShipment: undefined, // TODO: This is suppose to represent the original shipment associated with this return Platform doesn't send this I don't beleive.
    },
    billing: {
      dutiesPaidBy: undefined, // TODO: we don't send who the duties are paid by
      deliveryPaidBy: undefined, // TODO: we don't send who the the delivery is paid bys
      account: undefined, // TODO: where to get billing account
      postalCode: undefined, // TODO: where to get billing postcode for shipment
      country: undefined, // TODO: we don't send over billing country
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
