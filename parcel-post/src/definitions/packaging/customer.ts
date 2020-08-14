import { PackagingDefinition } from "@shipengine/connect-sdk";

export const box: PackagingDefinition = {
  id: "03318192-3e6c-475f-a496-a4f17c1dbcae",
  code: "BOX",
  name: "Box",
  description: "Your own box. Cannot be longer than 36 inches or weigh more than 150 pounds",
  requiresWeight: true,
  requiresDimensions: true,
};

export const envelope: PackagingDefinition = {
  id: "59ea9801-9377-495d-a71c-71b65ced205f",
  code: "ENV",
  name: "Envelope",
  description: "Your own envelope. May not exceed 18 inches in length or 3 inches in thickness",
  requiresWeight: true,
  requiresDimensions: true,
};

export const bag: PackagingDefinition = {
  id: "c8d127db-cc09-4114-90c2-fd76b8d54497",
  code: "BAG",
  name: "Bag",
  description: "Your own bag. May not exceed 36 inches in diameter or weigh more than 45 pounds",
  requiresWeight: true,
  requiresDimensions: true,
};

export const customerPackaging = [box, envelope, bag];
