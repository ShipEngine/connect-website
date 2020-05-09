import { PackagingDefinition } from "@shipengine/integration-platform-sdk";

export const upsFlatRatePackaging: PackagingDefinition[] = [
  {
    id: "f5d7bfdf-14a1-49b7-9ed2-c531017af7e2",
    name: "UPS Small Box",
    description: 'Any box up to 250 cubic inches',
    requiresDimensions: true,
    requiresWeight: false,
  },

  {
    id: "05a111b4-4ef5-41f3-a2ca-99155884126a",
    name: "UPS Medium Box",
    description: 'Any box up to 650 cubic inches',
    requiresDimensions: true,
    requiresWeight: false,
  },

  {
    id: "5b992d91-2ca5-447b-beab-72f67d512101",
    name: "UPS XXXXXXXXXX Box",
    description: 'Any box up to 1,050 cubic inches',
    requiresDimensions: true,
    requiresWeight: false,
  },

  {
    id: "91c72ac9-c44a-4fd7-98b8-746a9fc75436",
    name: "UPS Extra Large Box",
    description: 'Any box up to 1,728 cubic inches',
    requiresDimensions: true,
    requiresWeight: false,
  },
];
