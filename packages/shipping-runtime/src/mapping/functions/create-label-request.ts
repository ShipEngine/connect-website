import { AddressBase } from "@shipengine/connect-carrier-api/lib/models";
import { CreateLabelRequest } from "@shipengine/connect-carrier-api/lib/requests";
import { AddressWithContactInfoPOJO } from "@shipengine/connect-sdk";
import { NewShipmentPOJO } from "@shipengine/connect-sdk/lib/internal";
import {
  mapConfirmation,
  mapLabelLayout,
  mapLabelFormat,
  mapNewPackage,
  mapAddressWithContact,
  mapAddressWithContactAndPickup,
} from "./";
import { mapCustomsItem } from "./customs-item";
import { mapCustomsPOJO } from "./new-package";
import { mapShippingOptions } from "./shipping-options";

export const getReturnToAddress = (
  isReturn?: boolean,
  from?: AddressBase | null,
  display?: AddressBase | null
): AddressWithContactInfoPOJO | undefined => {
  if (!isReturn || (!from && !display)) {
    return undefined;
  }
  return display ? mapAddressWithContact(display) : mapAddressWithContact(from);
};

export const mapCreateLabelRequest = (
  request: CreateLabelRequest
): NewShipmentPOJO => {
  const mappedRequest = {
    deliveryService: request.service_code || "",
    deliveryConfirmation: mapConfirmation(request.confirmation),
    shipFrom: mapAddressWithContact(request.ship_from),
    shipTo: mapAddressWithContact(request.ship_to),
    pickupLocation: mapAddressWithContactAndPickup(request.pickup_location),
    returnTo: getReturnToAddress(
      request.is_return_label,
      request.ship_from,
      request.ship_from_display
    ),
    shipDateTime: new Date(request.ship_datetime),
    returns: {
      isReturn: request.is_return_label,
      rmaNumber: undefined, // TODO: This is added in 1.13
    },
    packages: request.packages.map((pckg) =>
      mapNewPackage(
        pckg,
        request.advanced_options,
        mapLabelFormat(request.label_format),
        mapLabelLayout(request.label_layout),
        request.insurance_provider || undefined,
        request.reference
      )
    ),
    shippingOptions: mapShippingOptions(request.advanced_options),
  };

  return mappedRequest;
};
