import {
  Country,
  DeliveryConfirmationDefinition,
  DeliveryConfirmationType,
  DeliveryServiceClass,
  DeliveryServiceDefinition,
  DeliveryServiceGrade,
  DocumentFormat,
  DocumentSize,
  PackagingDefinition,
  ServiceArea,
} from "@shipengine/integration-platform-sdk";

const exampleDeliveryConfirmation: DeliveryConfirmationDefinition = {
  id: "<%- _uuidv4 %>",
  name: "Example Delivery Confirmation",
  description:
    "This is an example delivery confirmation. Please remove and define your own.",
  type: DeliveryConfirmationType.Delivery,
};

const examplePackaging: PackagingDefinition = {
  id: "<%- _uuidv4 %>",
  name: "Box",
  description:
    "Your own box. Cannot be longer than 36 inches or weigh more than 150 pounds",
  requiresWeight: true,
  requiresDimensions: true,
};

const exampleDeliveryService: DeliveryServiceDefinition = {
  id: "<%- _uuidv4 %>",
  name: "Example Delivery Service",
  description:
    "This is an example delivery service. Please remove and define your own.",
  class: DeliveryServiceClass.OneDay,
  deliveryConfirmations: [exampleDeliveryConfirmation],
  destinationCountries: [Country.UnitedStates],
  grade: DeliveryServiceGrade.Expedited,
  isInsurable: true,
  isTrackable: false,
  labelFormats: [DocumentFormat.PDF, DocumentFormat.PNG],
  labelSizes: [DocumentSize.Letter, DocumentSize.Inches4x6],
  originCountries: [Country.UnitedStates],
  packaging: [examplePackaging],
  serviceArea: ServiceArea.Domestic,
};

export default exampleDeliveryService;
