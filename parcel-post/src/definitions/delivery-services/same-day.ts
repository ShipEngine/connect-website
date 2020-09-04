import { Country, DeliveryServiceDefinition, DocumentFormat, DocumentSize, ServiceArea, ManifestType } from "@shipengine/connect";
import { adultSignature, photo, receipt, recipientSignature, signature } from "../delivery-confirmations";
import { customerPackaging } from "../packaging/customer";

export const sameDay: DeliveryServiceDefinition = {
  id: "8b69c0ff-9017-4e89-82dd-0dbfab691047",
  code: "SAMEDY",
  name: "Same Day Delivery",
  description: "Same day delivery within major U.S. metropolitan areas",
  serviceArea: ServiceArea.Domestic,
  manifestType: ManifestType.Digital,
  isTrackable: false,
  isInsurable: true,
  labelFormats: [
    DocumentFormat.PDF,
    DocumentFormat.PNG,
  ],
  labelSizes: [
    DocumentSize.Letter,
    DocumentSize.Inches4x6,
  ],
  originCountries: [
    Country.UnitedStates,
  ],
  destinationCountries: [
    Country.UnitedStates,
  ],
  packaging: customerPackaging,
  deliveryConfirmations: [
    photo, receipt, signature, adultSignature, recipientSignature,
  ],
};

export default sameDay;
