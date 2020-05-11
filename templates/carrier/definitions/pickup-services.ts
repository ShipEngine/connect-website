import { PickupServiceDefinition } from "@shipengine/integration-platform-sdk";

export const examplePickupService: PickupServiceDefinition = {
  id: "<%- _uuidv4 %>",
  name: "Example PickupService",
  description: "An example pickup service.",
};

export default [examplePickupService];
