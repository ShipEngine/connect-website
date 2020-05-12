import { DeliveryConfirmationDefinition, DeliveryConfirmationType } from "@shipengine/integration-platform-sdk";

export const signature: DeliveryConfirmationDefinition = {
  id: "dbcfb3b5-9457-4d82-b614-123aadc96b1e",
  name: "Signature Required",
  description: "Requires a signature from any resident",
  type: DeliveryConfirmationType.Signature
};

export const adultSignature: DeliveryConfirmationDefinition = {
  id: "50d8ae35-96cc-4101-8cfe-cd375e3326db",
  name: "Adult Signature Required",
  description: "Requires a signature from a resident of at least 18 years of age",
  type: DeliveryConfirmationType.AdultSignature,
};

export const recipientSignature: DeliveryConfirmationDefinition = {
  id: "2d3f09c4-27f9-4260-952a-d290c32f600b",
  name: "Recipient Signature",
  description: "Requires a signature from the addressed recipient",
  type: DeliveryConfirmationType.DirectSignature,
};

export const photo: DeliveryConfirmationDefinition = {
  id: "cc10a05a-78eb-11ea-bc55-0242ac130003",
  name: "Photo",
  description: "Photo proof of delivery will be emailed to the sender",
  type: DeliveryConfirmationType.Delivery,
};

export const receipt: DeliveryConfirmationDefinition = {
  id: "5c59b2b3-49fb-41c6-9e77-e97a75067f36",
  name: "Mailed Receipt",
  description: "A paper receipt confirming delivery will be mailed to the sender",
  type: DeliveryConfirmationType.Delivery,
};
