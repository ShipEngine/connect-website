import { Country, DeliveryServiceDefinition, DocumentFormat, DocumentSize, ServiceArea, ManifestType } from "@shipengine/connect";
import { adultSignature, photo, recipientSignature, signature } from "../delivery-confirmations";
import { customerPackaging } from "../packaging/customer";
import { upsFlatRatePackaging } from "../packaging/ups-flat-rate";

export const domesticEconomy: DeliveryServiceDefinition = {
  id: "2c24a88f-a6ab-4082-9761-674e9280d5f8",
  code: "DOMECO",
  name: "Domestic Economy",
  description: "5 - 7 day ground service within the U.S.",
  serviceArea: ServiceArea.Domestic,
  manifestType: ManifestType.Digital,
  supportsReturns: true,
  isTrackable: true,
  isInsurable: false,
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

export default domesticEconomy;
