import { PackagingDefinition } from "@shipengine/integration-platform-sdk";

export const fedExFlatRatePackaging: PackagingDefinition[] = [
  {
    id: "c1ae2353-2d82-40e6-bf75-e08b85c869c3",
    name: "FedEx® Envelope",
    description: '9-1/2" x 12-12" flat rate FedEx envelope',
    requiresWeight: false,
    requiresDimensions: false,
  },

  {
    id: "0472ad7d-2dae-4d8c-ad50-616c4fbec3e0",
    name: "FedEx® Pak",
    description: '12" x 15-12" flat rate FedEx padded envelope',
    requiresWeight: false,
    requiresDimensions: false,
  },

  {
    id: "58ae31a7-b42e-444e-9d41-aae0e3536658",
    name: "FedEx® Small Box",
    description: '10-7/8" x 1-1/2" x 12-3/8" flat rate FedEx box',
    requiresWeight: false,
    requiresDimensions: false,
  },

  {
    id: "b71ad26d-cdbb-4def-a0ce-9953f1017782",
    name: "FedEx® Medium Box",
    description: '11-1/2" x 2-3/8" x 13-1/4" flat rate FedEx box',
    requiresWeight: false,
    requiresDimensions: false,
  },

  {
    id: "48f9b7e2-d81a-41b8-93b3-bff14568f173",
    name: "FedEx® Lage Box",
    description: '12-3/8" x 3" x 17-1/2" flat rate FedEx large box',
    requiresWeight: false,
    requiresDimensions: false,
  },

  {
    id: "46e4edf0-b97a-47e0-b257-f11fe14c560d",
    name: "FedEx® Tube",
    description: '6" x 6" x 38" flat rate FedEx tube',
    requiresWeight: false,
    requiresDimensions: false,
  },
];
