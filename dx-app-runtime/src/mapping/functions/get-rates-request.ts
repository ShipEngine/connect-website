import { GetRatesRequest } from '@ipaas/capi/requests';
import { RateCriteriaPOJO } from '@shipengine/integration-platform-sdk';
import { mapGetRatesRequestToNewShipmentPOJO } from './shipment';
import { capiToDxPackageRateCriteria } from './package';

const mapGetRatesRequestToRateCriteriaPOJO = (
  request: GetRatesRequest
): RateCriteriaPOJO => {
  const shipment = mapGetRatesRequestToNewShipmentPOJO(request);
  const rateCriteria: RateCriteriaPOJO = {
    deliveryDateTime: shipment.shipDateTime,
    deliveryServices: [
      {
        id: shipment.deliveryService.id
      }
    ],
    // fulfillmentServices ??? Why is this happening? Why are we mapping to an enum of services?
    shipDateTime: shipment.shipDateTime,
    shipFrom: shipment.shipFrom,
    shipTo: shipment.shipTo,
    packages: request.packages.map(pckg =>
      capiToDxPackageRateCriteria(
        pckg,
        request.customs,
        request.advanced_options
      )
    ),
    returns: {
      isReturn: shipment.returns?.isReturn,
      outboundShipment: {
        trackingNumber: undefined, // TODO: We do not send over trackingNumber for the get rates shipments
        identifiers: undefined // TODO: what identifiers should be used here?
      }
    }
  };

  return rateCriteria;
};

export { mapGetRatesRequestToRateCriteriaPOJO };
