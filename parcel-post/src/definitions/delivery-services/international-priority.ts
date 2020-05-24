import { Country, DeliveryServiceClass, DeliveryServiceDefinition, DeliveryServiceGrade, DocumentFormat, DocumentSize, FulfillmentService, ServiceArea } from "@shipengine/integration-platform-sdk";
import { adultSignature, recipientSignature, signature } from "../delivery-confirmations";
import { customerPackaging } from "../packaging/customer";
import { fedExFlatRatePackaging } from "../packaging/fedex-flat-rate";

export const internationalPriority: DeliveryServiceDefinition = {
  id: "f4bf9040-a84c-4761-a2f4-fb1a2b42e905",
  identifiers: {
    apiCode: "INTPRI",
  },
  name: "International Priority",
  description:
    "Delivery typically in 1 to 3 business days, next business day to the U.S., Canada, Mexico and the Caribbean. " +
    "Reach major cities in Europe by 10:30 am typically in two business days.",
  class: DeliveryServiceClass.ThreeDay,
  grade: DeliveryServiceGrade.Expedited,
  serviceArea: ServiceArea.International,
  fulfillmentService: FulfillmentService.FedExInternationalPriority,
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
    Country.Barbados,
    Country.Jamaica,
    Country.TrinidadAndTobago,
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

export default internationalPriority;
