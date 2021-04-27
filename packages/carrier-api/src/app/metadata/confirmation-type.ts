export interface ConfirmationType {
  Name?: string;
  Type?: ConfirmationTypeType;
}

export enum ConfirmationTypeType {
  None = "None",
  Delivery = "Delivery",
  Signature = "Signature",
  AdultSignature = "AdultSignature",
  DirectSignature = "DirectSignature",
}
