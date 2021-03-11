import {
    Country,
    DeliveryServiceDefinition,
    DocumentFormat,
    DocumentSize,
    ManifestType,
    ServiceArea
} from "@shipengine/connect";

const exampleDeliveryService: DeliveryServiceDefinition = {
  id: "<%- _uuidv4 %>",
  name: "Example Delivery Service",
  code: "eds",
  description:
    "This is an example delivery service. Please remove and define your own.",
  deliveryConfirmations: [import("./example-delivery-confirmation")],
  manifestType: ManifestType.Digital,
  isInsurable: true,
  isTrackable: false,
  labelFormats: [DocumentFormat.PDF, DocumentFormat.PNG],
  labelSizes: [DocumentSize.Letter, DocumentSize.Inches4x6],
  availableCountries: [Country.UnitedStates],
  packaging: [import("./example-packaging")],
  serviceArea: ServiceArea.Domestic,
};

export default exampleDeliveryService;
