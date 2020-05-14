import {
  Country,
  DeliveryServiceClass,
  DeliveryServiceDefinition,
  DeliveryServiceGrade,
  DocumentFormat,
  DocumentSize,
  ServiceArea,
} from "@shipengine/integration-platform-sdk";

const exampleDeliveryService: DeliveryServiceDefinition = {
  id: "<%- _uuidv4 %>",
  name: "Example Delivery Service",
  description:
    "This is an example delivery service. Please remove and define your own.",
  class: DeliveryServiceClass.OneDay,
  deliveryConfirmations: [import("./example-delivery-confirmation")],
  destinationCountries: [Country.UnitedStates],
  grade: DeliveryServiceGrade.Expedited,
  isInsurable: true,
  isTrackable: false,
  labelFormats: [DocumentFormat.PDF, DocumentFormat.PNG],
  labelSizes: [DocumentSize.Letter, DocumentSize.Inches4x6],
  originCountries: [Country.UnitedStates],
  packaging: [import("./example-packaging")],
  serviceArea: ServiceArea.Domestic,
};

export default exampleDeliveryService;
