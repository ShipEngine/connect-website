import { GetRatesRequest } from "@ipaas/capi/requests";
import { RateCriteriaPOJO } from "@shipengine/integration-platform-sdk";
import mapShipment from './shipment';
import { capiToDxPackageRateCriteria } from "./package";

const mapGetRatesRequestToRateCriteriaPOJO = (request: GetRatesRequest): RateCriteriaPOJO => {
  const shipment = mapShipment(request);
  const rateCriteria: RateCriteriaPOJO = {
    deliveryDateTime: shipment.shipDateTime,
    deliveryServices: [{
      id: shipment.deliveryServiceID
    }],
    // fulfillmentServices ??? Why is this happening? Why are we mapping to an enum of services? 
    shipDateTime: shipment.shipDateTime,
    shipFrom: shipment.shipFrom,
    shipTo: shipment.shipTo,
    packages: request.packages.map(pckg => capiToDxPackageRateCriteria(pckg, request.customs, request.advanced_options)),
    returns: {
      isReturn: shipment.isReturn,
      outboundShipment: {
        //trackingNumber TODO: We do not send over trackingNumber for the get rates shipments
        //identifiers TODO: what identifiers should be used here? 
        
      }
    }
  };

  return rateCriteria;
}

export {
  mapGetRatesRequestToRateCriteriaPOJO
}
