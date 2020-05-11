import {
  Country,
  DeliveryServiceClass,
  DeliveryServiceDefinition,
  DeliveryServiceGrade,
  DocumentFormat,
  DocumentSize,
  ServiceArea,
} from "@shipengine/integration-platform-sdk";
import {
  adultSignature,
  photo,
  receipt,
  recipientSignature,
  signature,
} from "../delivery-confirmations";
import { customerPackaging } from "../packaging/customer";

const exampleDeliveryService: DeliveryServiceDefinition = {
  id: "<%- _uuidv4 %>",
  name: "Example Delivery Service",
  description: "An example delivery service.",
  class: DeliveryServiceClass.OneDay,
  grade: DeliveryServiceGrade.Expedited,
  serviceArea: ServiceArea.Domestic,
  isTrackable: false,
  isInsurable: true,
  labelFormats: [DocumentFormat.PDF, DocumentFormat.PNG],
  labelSizes: [DocumentSize.Letter, DocumentSize.Inches4x6],
  originCountries: [Country.UnitedStates],
  destinationCountries: [Country.UnitedStates],
  packaging: customerPackaging,
  deliveryConfirmations: [
    photo,
    receipt,
    signature,
    adultSignature,
    recipientSignature,
  ],
};

export default exampleDeliveryService;
