export interface ConfirmationType {
  Name?: string;
  Type?: ConfirmationTypeEnum;
}

export type ConfirmationDictionary = {
  [Key in ConfirmationTypeEnum]?: string | undefined;
};

export enum ConfirmationTypeEnum {
  None = "None",
  Delivery = "Delivery",
  Signature = "Signature",
  AdultSignature = "AdultSignature",
  DirectSignature = "DirectSignature",
}
