import { Country, DeliveryServiceClass, DeliveryServiceDefinition, DeliveryServiceGrade, DocumentFormat, DocumentSize, FulfillmentService, ServiceArea } from "@shipengine/integration-platform-sdk";
import { adultSignature, recipientSignature, signature } from "../delivery-confirmations";
import { customerPackaging } from "../packaging/customer";
import { fedExFlatRatePackaging } from "../packaging/fedex-flat-rate";

export const internationalEconomy: DeliveryServiceDefinition = {
  id: "17669004-c971-4349-a81e-a82d80066f30",
  identifiers: {
    apiCode: "INTECO",
  },
  name: "International Economy",
  description:
    "Ship packages economically to Canada, Mexico and Puerto Rico typically in 2 to 3 business days " +
    "and to other major international destinations in 2 to 5 business days.",
  class: DeliveryServiceClass.ThreeDay,
  grade: DeliveryServiceGrade.Economy,
  serviceArea: ServiceArea.International,
  fulfillmentService: FulfillmentService.FedExInternationalEconomy,
  allowsMultiplePackages: true,
  isTrackable: true,
  isInsurable: true,
  labelFormats: [
    DocumentFormat.PDF,
    DocumentFormat.PNG,
  ],
  labelSizes: [
    DocumentSize.A4,
    DocumentSize.Letter,
    DocumentSize.Inches4x6,
  ],
  originCountries: [
    Country.UnitedStates,
  ],
  destinationCountries: [
    Country.UnitedStates,
    Country.Canada,
    Country.Mexico,
    Country.PuertoRico,
    Country.Australia,
    Country.NewZealand,
    Country.UnitedKingdom,
    Country.Ireland,
    Country.Germany,
    Country.France,
  ],
  packaging: [
    ...customerPackaging,
    ...fedExFlatRatePackaging,
  ],
  deliveryConfirmations: [
    signature, adultSignature, recipientSignature,
  ],
};

export default internationalEconomy;
