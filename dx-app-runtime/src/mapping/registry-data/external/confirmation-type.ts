export default interface ConfirmationType {
  Name?: string | null;
  Type?: ConfirmationTypeType;
}

export enum ConfirmationTypeType {
  None = "None",
  Delivery = "Delivery",
  Signature = "Signature",
  AdultSignature = "AdultSignature",
  DirectSignature = "DirectSignature",
}
