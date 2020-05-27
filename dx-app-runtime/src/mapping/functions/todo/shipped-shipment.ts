import { PickupShipment } from "../capi/models/pickup-shipment";
import { ShipmentConfig, Country, NonDeliveryAction } from "@shipengine/ipaas";
import mapSemiImplementedPackage from './shipped-package';

export default (shipment: PickupShipment): ShipmentConfig => {
  const emptyAddress = {
    addressLines: ['','',''],
    cityLocality: '',
    stateProvince: '',
    postalCode: '',
    country: Country.UnitedStates,
    name: ''
  };
// TODO: UPDATE CAPI TO RETURN FULL MODEL & remove this function
  const mappedShipment: ShipmentConfig = {
    trackingNumber: shipment.tracking_number || '',
    deliveryServiceID: shipment.service_code || '',
    shipFrom: emptyAddress,
    shipTo: emptyAddress,
    shipDateTime: new Date(Date.now()),
    packages: shipment.packages?.map(mapSemiImplementedPackage) || [],
    nonDeliveryAction: NonDeliveryAction.ReturnToSender,
    
  }
  return mappedShipment;
}
