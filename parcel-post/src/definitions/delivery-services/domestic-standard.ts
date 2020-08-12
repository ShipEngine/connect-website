import { Country, DeliveryServiceClass, DeliveryServiceDefinition, DeliveryServiceGrade, DocumentFormat, DocumentSize, ServiceArea, ManifestType } from "@shipengine/integration-platform-sdk";
import { adultSignature, photo, recipientSignature, signature } from "../delivery-confirmations";
import { customerPackaging } from "../packaging/customer";
import { upsFlatRatePackaging } from "../packaging/ups-flat-rate";

export const domesticStandard: DeliveryServiceDefinition = {
  id: "43fc9d24-6a89-428a-ad34-c614c14170b6",
  identifiers: {
    apiCode: "DOMSTD",
  },
  code: "dom_std",
  name: "Domestic Standard",
  description: "3 day ground service within the U.S.",
  class: DeliveryServiceClass.Ground,
  grade: DeliveryServiceGrade.Standard,
  serviceArea: ServiceArea.Domestic,
  manifestType: ManifestType.Digital,
  isTrackable: true,
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
  packaging: [
    ...customerPackaging,
    ...upsFlatRatePackaging,
  ],
  deliveryConfirmations: [
    photo, signature, adultSignature, recipientSignature,
  ],
};

export default domesticStandard;
