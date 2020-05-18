import {
  DeliveryConfirmationDefinition,
  DeliveryConfirmationType,
} from "@shipengine/integration-platform-sdk";

const exampleDeliveryConfirmation: DeliveryConfirmationDefinition = {
  id: "<%- _uuidv4 %>",
  name: "Example Delivery Confirmation",
  description:
    "This is an example delivery confirmation. Please remove and define your own.",
  type: DeliveryConfirmationType.Delivery,
};

export default exampleDeliveryConfirmation;
